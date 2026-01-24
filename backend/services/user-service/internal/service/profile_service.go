package service

import (
	"context"
	"encoding/json"
	"errors"
	"time"

	"github.com/saiyam0211/defellix/services/user-service/internal/domain"
	"github.com/saiyam0211/defellix/services/user-service/internal/dto"
	"github.com/saiyam0211/defellix/services/user-service/internal/repository"
	"github.com/google/uuid"
)

var (
	// ErrProfileExists indicates profile already exists
	ErrProfileExists = errors.New("profile already exists")
)

// ProfileService handles profile creation and management
type ProfileService struct {
	userRepo repository.UserRepository
}

// NewProfileService creates a new profile service
func NewProfileService(userRepo repository.UserRepository) *ProfileService {
	return &ProfileService{
		userRepo: userRepo,
	}
}

// CreateProfile creates a new freelancer profile
func (s *ProfileService) CreateProfile(ctx context.Context, userID uint, email string, req *dto.CreateProfileRequest) (*domain.UserProfile, error) {
	// Check if profile already exists
	existing, _ := s.userRepo.FindByUserID(ctx, userID)
	if existing != nil {
		return nil, ErrProfileExists
	}

	// Convert skills to JSON
	skillsJSON, err := json.Marshal(req.Skills)
	if err != nil {
		return nil, err
	}

	// Create profile
	profile := &domain.UserProfile{
		UserID:        userID,
		Email:         email,
		FullName:      req.FullName,
		Photo:         req.Photo,
		ShortHeadline: req.ShortHeadline,
		Role:          req.Role,
		Location:      req.Location,
		Experience:    req.Experience,
		GitHubLink:    req.GitHubLink,
		LinkedInLink:  req.LinkedInLink,
		PortfolioLink: req.PortfolioLink,
		InstagramLink: req.InstagramLink,
		Skills:        skillsJSON,
		IsActive:      true,
		IsProfileComplete: s.checkProfileComplete(req),
		CreatedAt:     time.Now(),
		UpdatedAt:     time.Now(),
	}

	if err := s.userRepo.Create(ctx, profile); err != nil {
		return nil, err
	}

	return profile, nil
}

// checkProfileComplete checks if all required fields are filled
func (s *ProfileService) checkProfileComplete(req *dto.CreateProfileRequest) bool {
	return req.FullName != "" &&
		req.ShortHeadline != "" &&
		req.Role != "" &&
		len(req.Skills) > 0
}

// AddProject adds a project to user profile
func (s *ProfileService) AddProject(ctx context.Context, userID uint, req *dto.AddProjectRequest) (*domain.Project, error) {
	// Get existing profile
	profile, err := s.userRepo.FindByUserID(ctx, userID)
	if err != nil {
		return nil, err
	}

	// Parse existing projects
	var projects []domain.Project
	if len(profile.Projects) > 0 {
		if err := json.Unmarshal(profile.Projects, &projects); err != nil {
			return nil, err
		}
	}

	// Create project
	project := &domain.Project{
		ID:            uuid.New().String(),
		ProjectName:   req.ProjectName,
		Description:   req.Description,
		Screenshots:   req.Screenshots,
		GitHubLink:    req.GitHubLink,
		LiveLink:      req.LiveLink,
		DriveLink:     req.DriveLink,
		VideoLink:     req.VideoLink,
		Technologies:  req.Technologies,
		ClientName:    req.ClientName,
		CompletedDate: time.Now().Format(time.RFC3339),
		CreatedAt:     time.Now().Format(time.RFC3339),
		UpdatedAt:     time.Now().Format(time.RFC3339),
	}

	// Convert other links
	if len(req.OtherLinks) > 0 {
		project.OtherLinks = make([]domain.ProjectLink, len(req.OtherLinks))
		for i, link := range req.OtherLinks {
			project.OtherLinks[i] = domain.ProjectLink{
				Label: link.Label,
				URL:   link.URL,
			}
		}
	}

	// Add to projects array
	projects = append(projects, *project)

	// Update stats
	var stats map[string]interface{}
	if len(profile.Stats) > 0 {
		if err := json.Unmarshal(profile.Stats, &stats); err != nil {
			stats = make(map[string]interface{})
		}
	} else {
		stats = make(map[string]interface{})
	}
	stats["no_of_projects_done"] = len(projects)
	statsJSON, _ := json.Marshal(stats)

	// Marshal projects to JSONB
	projectsJSON, err := json.Marshal(projects)
	if err != nil {
		return nil, err
	}

	// Update profile
	profile.Projects = projectsJSON
	profile.Stats = statsJSON
	profile.UpdatedAt = time.Now()

	if err := s.userRepo.Update(ctx, profile); err != nil {
		return nil, err
	}

	return project, nil
}

// UpdateProject updates a project
func (s *ProfileService) UpdateProject(ctx context.Context, userID uint, projectID string, req *dto.UpdateProjectRequest) (*domain.Project, error) {
	profile, err := s.userRepo.FindByUserID(ctx, userID)
	if err != nil {
		return nil, err
	}

	// Parse existing projects
	var projects []domain.Project
	if len(profile.Projects) > 0 {
		if err := json.Unmarshal(profile.Projects, &projects); err != nil {
			return nil, err
		}
	}

	// Find and update project
	for i := range projects {
		if projects[i].ID == projectID {
			if req.ProjectName != "" {
				projects[i].ProjectName = req.ProjectName
			}
			if req.Description != "" {
				projects[i].Description = req.Description
			}
			if req.Screenshots != nil {
				projects[i].Screenshots = req.Screenshots
			}
			if req.GitHubLink != "" {
				projects[i].GitHubLink = req.GitHubLink
			}
			if req.LiveLink != "" {
				projects[i].LiveLink = req.LiveLink
			}
			if req.DriveLink != "" {
				projects[i].DriveLink = req.DriveLink
			}
			if req.VideoLink != "" {
				projects[i].VideoLink = req.VideoLink
			}
			if req.Technologies != nil {
				projects[i].Technologies = req.Technologies
			}
			if req.ClientName != "" {
				projects[i].ClientName = req.ClientName
			}
			if req.OtherLinks != nil {
				projects[i].OtherLinks = make([]domain.ProjectLink, len(req.OtherLinks))
				for j, link := range req.OtherLinks {
					projects[i].OtherLinks[j] = domain.ProjectLink{
						Label: link.Label,
						URL:   link.URL,
					}
				}
			}
			projects[i].UpdatedAt = time.Now().Format(time.RFC3339)

			// Marshal back to JSONB
			projectsJSON, err := json.Marshal(projects)
			if err != nil {
				return nil, err
			}

			profile.Projects = projectsJSON
			profile.UpdatedAt = time.Now()

			if err := s.userRepo.Update(ctx, profile); err != nil {
				return nil, err
			}

			return &projects[i], nil
		}
	}

	return nil, errors.New("project not found")
}

// DeleteProject deletes a project
func (s *ProfileService) DeleteProject(ctx context.Context, userID uint, projectID string) error {
	profile, err := s.userRepo.FindByUserID(ctx, userID)
	if err != nil {
		return err
	}

	// Parse existing projects
	var projects []domain.Project
	if len(profile.Projects) > 0 {
		if err := json.Unmarshal(profile.Projects, &projects); err != nil {
			return err
		}
	}

	// Remove project
	newProjects := make([]domain.Project, 0, len(projects))
	found := false
	for _, project := range projects {
		if project.ID != projectID {
			newProjects = append(newProjects, project)
		} else {
			found = true
		}
	}

	if !found {
		return errors.New("project not found")
	}

	// Update stats
	var stats map[string]interface{}
	if len(profile.Stats) > 0 {
		if err := json.Unmarshal(profile.Stats, &stats); err != nil {
			stats = make(map[string]interface{})
		}
	} else {
		stats = make(map[string]interface{})
	}
	stats["no_of_projects_done"] = len(newProjects)
	statsJSON, _ := json.Marshal(stats)

	// Marshal back to JSONB
	projectsJSON, err := json.Marshal(newProjects)
	if err != nil {
		return err
	}

	profile.Projects = projectsJSON
	profile.Stats = statsJSON
	profile.UpdatedAt = time.Now()

	return s.userRepo.Update(ctx, profile)
}
