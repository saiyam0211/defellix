package repository

import (
	"context"
	"errors"
	"time"

	"github.com/saiyam0211/defellix/services/contract-service/internal/domain"
	"gorm.io/gorm"
)

var (
	ErrContractNotFound = errors.New("contract not found")
)

type ContractRepository interface {
	Create(ctx context.Context, c *domain.Contract, milestones []domain.ContractMilestone) error
	GetByID(ctx context.Context, id uint, freelancerUserID uint) (*domain.Contract, error)
	ListByFreelancer(ctx context.Context, freelancerUserID uint, status string, page, limit int) ([]*domain.Contract, int64, error)
	Update(ctx context.Context, c *domain.Contract, milestones []domain.ContractMilestone) error
	UpdateContractOnly(ctx context.Context, c *domain.Contract) error
	UpdateStatus(ctx context.Context, id uint, freelancerUserID uint, status string) error
	UpdateStatusAndSentAt(ctx context.Context, id uint, freelancerUserID uint, status string, sentAt *time.Time) error
	Delete(ctx context.Context, id uint, freelancerUserID uint) error
	ReplaceMilestones(ctx context.Context, contractID uint, milestones []domain.ContractMilestone) error
	// DeleteDraftsOlderThan permanently removes draft contracts (and their milestones) with created_at < cutoff. Returns count deleted.
	DeleteDraftsOlderThan(ctx context.Context, cutoff time.Time) (int64, error)
}

type contractRepository struct {
	db *gorm.DB
}

func NewContractRepository(db *gorm.DB) ContractRepository {
	return &contractRepository{db: db}
}

func (r *contractRepository) Create(ctx context.Context, c *domain.Contract, milestones []domain.ContractMilestone) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Create(c).Error; err != nil {
			return err
		}
		for i := range milestones {
			milestones[i].ContractID = c.ID
			milestones[i].OrderIndex = i
			if err := tx.Create(&milestones[i]).Error; err != nil {
				return err
			}
		}
		return nil
	})
}

func (r *contractRepository) GetByID(ctx context.Context, id uint, freelancerUserID uint) (*domain.Contract, error) {
	var c domain.Contract
	err := r.db.WithContext(ctx).Preload("Milestones", func(db *gorm.DB) *gorm.DB {
		return db.Order("order_index ASC")
	}).Where("id = ? AND freelancer_user_id = ?", id, freelancerUserID).First(&c).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, ErrContractNotFound
		}
		return nil, err
	}
	return &c, nil
}

func (r *contractRepository) ListByFreelancer(ctx context.Context, freelancerUserID uint, status string, page, limit int) ([]*domain.Contract, int64, error) {
	q := r.db.WithContext(ctx).Model(&domain.Contract{}).Where("freelancer_user_id = ?", freelancerUserID)
	if status != "" {
		q = q.Where("status = ?", status)
	}
	var total int64
	if err := q.Count(&total).Error; err != nil {
		return nil, 0, err
	}
	var list []*domain.Contract
	offset := (page - 1) * limit
	if offset < 0 {
		offset = 0
	}
	if limit <= 0 {
		limit = 20
	}
	err := q.Preload("Milestones", func(db *gorm.DB) *gorm.DB {
		return db.Order("order_index ASC")
	}).Order("updated_at DESC").Offset(offset).Limit(limit).Find(&list).Error
	if err != nil {
		return nil, 0, err
	}
	return list, total, nil
}

func (r *contractRepository) Update(ctx context.Context, c *domain.Contract, milestones []domain.ContractMilestone) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Save(c).Error; err != nil {
			return err
		}
		if err := tx.Where("contract_id = ?", c.ID).Delete(&domain.ContractMilestone{}).Error; err != nil {
			return err
		}
		for i := range milestones {
			milestones[i].ContractID = c.ID
			milestones[i].OrderIndex = i
			if err := tx.Create(&milestones[i]).Error; err != nil {
				return err
			}
		}
		return nil
	})
}

func (r *contractRepository) UpdateContractOnly(ctx context.Context, c *domain.Contract) error {
	return r.db.WithContext(ctx).Save(c).Error
}

func (r *contractRepository) UpdateStatus(ctx context.Context, id uint, freelancerUserID uint, status string) error {
	res := r.db.WithContext(ctx).Model(&domain.Contract{}).
		Where("id = ? AND freelancer_user_id = ?", id, freelancerUserID).
		Update("status", status)
	if res.Error != nil {
		return res.Error
	}
	if res.RowsAffected == 0 {
		return ErrContractNotFound
	}
	return nil
}

func (r *contractRepository) UpdateStatusAndSentAt(ctx context.Context, id uint, freelancerUserID uint, status string, sentAt *time.Time) error {
	updates := map[string]interface{}{"status": status}
	if sentAt != nil {
		updates["sent_at"] = sentAt
	}
	res := r.db.WithContext(ctx).Model(&domain.Contract{}).
		Where("id = ? AND freelancer_user_id = ?", id, freelancerUserID).
		Updates(updates)
	if res.Error != nil {
		return res.Error
	}
	if res.RowsAffected == 0 {
		return ErrContractNotFound
	}
	return nil
}

func (r *contractRepository) Delete(ctx context.Context, id uint, freelancerUserID uint) error {
	res := r.db.WithContext(ctx).Where("id = ? AND freelancer_user_id = ?", id, freelancerUserID).Delete(&domain.Contract{})
	if res.Error != nil {
		return res.Error
	}
	if res.RowsAffected == 0 {
		return ErrContractNotFound
	}
	return nil
}

func (r *contractRepository) ReplaceMilestones(ctx context.Context, contractID uint, milestones []domain.ContractMilestone) error {
	return r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		if err := tx.Where("contract_id = ?", contractID).Delete(&domain.ContractMilestone{}).Error; err != nil {
			return err
		}
		for i := range milestones {
			milestones[i].ContractID = contractID
			milestones[i].OrderIndex = i
			if err := tx.Create(&milestones[i]).Error; err != nil {
				return err
			}
		}
		return nil
	})
}

func (r *contractRepository) DeleteDraftsOlderThan(ctx context.Context, cutoff time.Time) (int64, error) {
	var deleted int64
	err := r.db.WithContext(ctx).Transaction(func(tx *gorm.DB) error {
		var ids []uint
		if err := tx.Model(&domain.Contract{}).Where("status = ? AND created_at < ?", domain.ContractStatusDraft, cutoff).Pluck("id", &ids).Error; err != nil {
			return err
		}
		if len(ids) == 0 {
			return nil
		}
		if err := tx.Where("contract_id IN ?", ids).Unscoped().Delete(&domain.ContractMilestone{}).Error; err != nil {
			return err
		}
		res := tx.Where("id IN ?", ids).Unscoped().Delete(&domain.Contract{})
		if res.Error != nil {
			return res.Error
		}
		deleted = res.RowsAffected
		return nil
	})
	return deleted, err
}
