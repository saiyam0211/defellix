package notification

import "context"

// ContractNotifier is the interface for sending notifications when contract lifecycle events occur.
// Implementations can be no-op (dev), log-only, or call a notification service (e.g. email on send).
type ContractNotifier interface {
	// NotifyContractSent is called when a contract is sent to the client. Run off the hot path (e.g. async).
	// contractID and shareableLink are for reference; clientEmail is the recipient for "email to client".
	NotifyContractSent(ctx context.Context, contractID uint, clientEmail, shareableLink string)
}

// NoopNotifier does nothing. Use in development or when notification service is not yet integrated.
type NoopNotifier struct{}

func (NoopNotifier) NotifyContractSent(context.Context, uint, string, string) {}
