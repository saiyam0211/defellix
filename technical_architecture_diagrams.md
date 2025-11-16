# Technical Architecture Diagrams - Decentralized Freelancer Trust Platform

## 1. Blockchain Integration Architecture

```mermaid
graph TB
    subgraph "Frontend Applications"
        WEB[Web App<br/>React + TypeScript]
        MOBILE[Mobile App<br/>React Native]
        API_CLIENT[API Client<br/>Third-party Integration]
    end
    
    subgraph "API Gateway Layer"
        GATEWAY[API Gateway<br/>Rate Limiting + Auth]
        MIDDLEWARE[Middleware<br/>Request Validation]
    end
    
    subgraph "Backend Services"
        AUTH[Authentication Service<br/>JWT + OAuth2]
        CONTRACT[Contract Service<br/>Business Logic]
        BLOCKCHAIN[Blockchain Service<br/>Web3 Integration]
        WALLET[Wallet Service<br/>Custodial Management]
        REPUTATION[Reputation Service<br/>Scoring Engine]
    end
    
    subgraph "Blockchain Infrastructure"
        POLYGON[Polygon Network<br/>Main Chain]
        TESTNET[Mumbai Testnet<br/>Development]
        IPFS[IPFS Network<br/>Document Storage]
        INFURA[Infura RPC<br/>Node Provider]
    end
    
    subgraph "Smart Contracts"
        CONTRACT_REGISTRY[Contract Registry<br/>Solidity Smart Contract]
        REPUTATION_CONTRACT[Reputation Contract<br/>Score Management]
        VERIFICATION_CONTRACT[Verification Contract<br/>KYC Records]
    end
    
    subgraph "Data Storage"
        MONGODB[(MongoDB<br/>Application Data)]
        REDIS[(Redis<br/>Cache + Sessions)]
        S3[(AWS S3<br/>File Storage)]
    end
    
    WEB --> GATEWAY
    MOBILE --> GATEWAY
    API_CLIENT --> GATEWAY
    
    GATEWAY --> MIDDLEWARE
    MIDDLEWARE --> AUTH
    MIDDLEWARE --> CONTRACT
    MIDDLEWARE --> BLOCKCHAIN
    
    CONTRACT --> MONGODB
    CONTRACT --> REDIS
    BLOCKCHAIN --> WALLET
    BLOCKCHAIN --> REPUTATION
    
    BLOCKCHAIN --> INFURA
    INFURA --> POLYGON
    INFURA --> TESTNET
    
    CONTRACT_REGISTRY --> POLYGON
    REPUTATION_CONTRACT --> POLYGON
    VERIFICATION_CONTRACT --> POLYGON
    
    CONTRACT --> IPFS
    CONTRACT --> S3
```

## 2. Smart Contract Architecture

```mermaid
classDiagram
    class ContractRegistry {
        +mapping(bytes32 => Contract) contracts
        +mapping(address => bytes32[]) userContracts
        +uint256 contractCounter
        +createContract(contractData) bytes32
        +signContract(contractId, signature) bool
        +updateContractStatus(contractId, status) bool
        +getContract(contractId) Contract
        +getUserContracts(userAddress) bytes32[]
        +event ContractCreated(contractId, freelancer, client)
        +event ContractSigned(contractId, timestamp)
        +event ContractCompleted(contractId, rating)
    }
    
    class Contract {
        +bytes32 id
        +address freelancer
        +address client
        +string title
        +string description
        +uint256 amount
        +uint256 createdAt
        +uint256 signedAt
        +uint256 completedAt
        +ContractStatus status
        +Milestone[] milestones
        +Rating rating
    }
    
    class ReputationManager {
        +mapping(address => UserReputation) reputations
        +uint256 baseScore
        +updateScore(userAddress, scoreChange) bool
        +getReputation(userAddress) UserReputation
        +calculateScore(completedContracts, ratings) uint256
        +addBadge(userAddress, badgeType) bool
        +event ScoreUpdated(userAddress, newScore)
        +event BadgeAwarded(userAddress, badgeType)
    }
    
    class UserReputation {
        +uint256 score
        +uint256 totalContracts
        +uint256 completedContracts
        +uint256 totalRating
        +uint256 onTimeDeliveries
        +Badge[] badges
        +uint256 lastUpdated
    }
    
    class VerificationManager {
        +mapping(address => Verification[]) verifications
        +addVerification(userAddress, verificationType) bool
        +isVerified(userAddress, verificationType) bool
        +getVerificationLevel(userAddress) uint256
        +event UserVerified(userAddress, verificationType)
    }
    
    class Verification {
        +VerificationType verType
        +uint256 verifiedAt
        +uint256 expiresAt
        +bool isActive
        +string verificationHash
    }
    
    ContractRegistry --> Contract : manages
    Contract --> ReputationManager : updates
    ReputationManager --> UserReputation : stores
    VerificationManager --> Verification : manages
    UserReputation --> ReputationManager : belongs to
```

## 3. Database Schema & Relationships

```mermaid
erDiagram
    USERS {
        uuid id PK
        string email UK
        string password_hash
        string full_name
        enum user_type
        jsonb profile_data
        string blockchain_address
        boolean email_verified
        boolean phone_verified
        boolean linkedin_verified
        boolean github_verified
        timestamp created_at
        timestamp updated_at
        timestamp last_login
    }
    
    FREELANCER_PROFILES {
        uuid id PK
        uuid user_id FK
        text bio
        jsonb skills
        jsonb portfolio_links
        string linkedin_url
        string github_url
        decimal reputation_score
        integer reputation_points
        string tier
        jsonb badges
        jsonb verification_status
        integer total_contracts
        integer completed_contracts
        decimal average_rating
        timestamp created_at
        timestamp updated_at
    }
    
    CLIENT_PROFILES {
        uuid id PK
        uuid user_id FK
        string company_name
        string company_domain
        string company_size
        string industry
        boolean business_verified
        decimal client_score
        integer contracts_created
        integer contracts_completed
        decimal average_freelancer_rating
        timestamp created_at
        timestamp updated_at
    }
    
    CONTRACTS {
        uuid id PK
        string blockchain_contract_id UK
        uuid freelancer_id FK
        uuid client_id FK
        string title
        text description
        decimal amount
        string currency
        jsonb payment_terms
        jsonb milestones
        enum status
        string blockchain_hash
        timestamp created_at
        timestamp sent_at
        timestamp signed_at
        timestamp completed_at
        timestamp updated_at
        timestamp expires_at
    }
    
    MILESTONES {
        uuid id PK
        uuid contract_id FK
        integer milestone_number
        string title
        text description
        decimal amount
        enum status
        timestamp due_date
        timestamp submitted_at
        timestamp approved_at
        timestamp payment_confirmed_at
        jsonb deliverables
        text client_feedback
        text freelancer_notes
    }
    
    RATINGS {
        uuid id PK
        uuid contract_id FK
        uuid rater_id FK
        uuid ratee_id FK
        enum rater_type
        integer overall_rating
        integer communication_rating
        integer quality_rating
        integer timeliness_rating
        integer professionalism_rating
        text feedback
        boolean is_public
        string blockchain_hash
        timestamp created_at
    }
    
    DISPUTES {
        uuid id PK
        uuid contract_id FK
        uuid raised_by FK
        enum dispute_type
        text description
        jsonb evidence
        enum status
        text resolution
        uuid mediator_id FK
        decimal resolution_amount
        jsonb reputation_impact
        timestamp created_at
        timestamp resolved_at
        timestamp escalated_at
    }
    
    VERIFICATIONS {
        uuid id PK
        uuid user_id FK
        enum verification_type
        enum status
        jsonb verification_data
        string verification_hash
        string external_reference
        timestamp submitted_at
        timestamp verified_at
        timestamp expires_at
        uuid verified_by FK
    }
    
    BLOCKCHAIN_TRANSACTIONS {
        uuid id PK
        uuid contract_id FK
        string transaction_hash UK
        string contract_address
        enum transaction_type
        jsonb transaction_data
        integer block_number
        timestamp block_timestamp
        decimal gas_used
        decimal gas_price
        enum status
        timestamp created_at
    }
    
    NOTIFICATIONS {
        uuid id PK
        uuid user_id FK
        enum notification_type
        string title
        text message
        jsonb data
        boolean read
        enum channel
        enum priority
        timestamp sent_at
        timestamp read_at
        timestamp created_at
    }
    
    PAYMENT_CONFIRMATIONS {
        uuid id PK
        uuid milestone_id FK
        uuid freelancer_id FK
        uuid client_id FK
        decimal amount
        string currency
        enum payment_method
        string payment_proof_url
        boolean ai_verified
        boolean client_confirmed
        timestamp payment_date
        timestamp confirmed_at
        timestamp created_at
    }
    
    REPUTATION_HISTORY {
        uuid id PK
        uuid user_id FK
        uuid contract_id FK
        integer score_before
        integer score_after
        integer score_change
        enum change_reason
        jsonb change_details
        string blockchain_hash
        timestamp created_at
    }
    
    API_KEYS {
        uuid id PK
        uuid user_id FK
        string key_hash
        string key_name
        jsonb permissions
        boolean active
        timestamp last_used
        timestamp expires_at
        timestamp created_at
    }
    
    USERS ||--o{ FREELANCER_PROFILES : "has"
    USERS ||--o{ CLIENT_PROFILES : "has"
    USERS ||--o{ CONTRACTS : "creates/receives"
    USERS ||--o{ RATINGS : "gives/receives"
    USERS ||--o{ DISPUTES : "raises"
    USERS ||--o{ VERIFICATIONS : "has"
    USERS ||--o{ NOTIFICATIONS : "receives"
    USERS ||--o{ REPUTATION_HISTORY : "has"
    USERS ||--o{ API_KEYS : "owns"
    
    CONTRACTS ||--o{ MILESTONES : "contains"
    CONTRACTS ||--o{ RATINGS : "generates"
    CONTRACTS ||--o{ DISPUTES : "may_have"
    CONTRACTS ||--o{ BLOCKCHAIN_TRANSACTIONS : "recorded_in"
    
    MILESTONES ||--o{ PAYMENT_CONFIRMATIONS : "has"
    
    FREELANCER_PROFILES ||--o{ CONTRACTS : "works_on"
    CLIENT_PROFILES ||--o{ CONTRACTS : "creates"
```

## 4. API Architecture & Endpoints

```mermaid
graph TB
    subgraph "Client Applications"
        WEB_CLIENT[Web Application]
        MOBILE_CLIENT[Mobile Application]
        THIRD_PARTY[Third-party Integrations]
    end
    
    subgraph "API Gateway"
        GATEWAY[Kong API Gateway<br/>Rate Limiting & Auth]
        LOAD_BALANCER[Load Balancer<br/>Request Distribution]
    end
    
    subgraph "Authentication Layer"
        AUTH_SERVICE[Auth Service<br/>JWT + OAuth2]
        RATE_LIMITER[Rate Limiter<br/>Request Throttling]
        API_VALIDATOR[Request Validator<br/>Schema Validation]
    end
    
    subgraph "Core API Services"
        USER_API[User Management API<br/>/api/v1/users/*]
        CONTRACT_API[Contract API<br/>/api/v1/contracts/*]
        REPUTATION_API[Reputation API<br/>/api/v1/reputation/*]
        VERIFICATION_API[Verification API<br/>/api/v1/verification/*]
        NOTIFICATION_API[Notification API<br/>/api/v1/notifications/*]
        DISPUTE_API[Dispute API<br/>/api/v1/disputes/*]
    end
    
    subgraph "Blockchain APIs"
        BLOCKCHAIN_API[Blockchain API<br/>/api/v1/blockchain/*]
        WALLET_API[Wallet API<br/>/api/v1/wallets/*]
        TRANSACTION_API[Transaction API<br/>/api/v1/transactions/*]
    end
    
    subgraph "External APIs"
        PAYMENT_API[Payment Verification<br/>Bank/UPI APIs]
        EMAIL_API[Email Service<br/>SendGrid API]
        SMS_API[SMS Service<br/>Twilio API]
        STORAGE_API[File Storage<br/>AWS S3 API]
    end
    
    WEB_CLIENT --> GATEWAY
    MOBILE_CLIENT --> GATEWAY
    THIRD_PARTY --> GATEWAY
    
    GATEWAY --> LOAD_BALANCER
    LOAD_BALANCER --> AUTH_SERVICE
    AUTH_SERVICE --> RATE_LIMITER
    RATE_LIMITER --> API_VALIDATOR
    
    API_VALIDATOR --> USER_API
    API_VALIDATOR --> CONTRACT_API
    API_VALIDATOR --> REPUTATION_API
    API_VALIDATOR --> VERIFICATION_API
    API_VALIDATOR --> NOTIFICATION_API
    API_VALIDATOR --> DISPUTE_API
    
    CONTRACT_API --> BLOCKCHAIN_API
    REPUTATION_API --> BLOCKCHAIN_API
    VERIFICATION_API --> BLOCKCHAIN_API
    
    BLOCKCHAIN_API --> WALLET_API
    BLOCKCHAIN_API --> TRANSACTION_API
    
    NOTIFICATION_API --> EMAIL_API
    NOTIFICATION_API --> SMS_API
    CONTRACT_API --> STORAGE_API
    VERIFICATION_API --> PAYMENT_API
```

## 5. Security Architecture

```mermaid
graph TB
    subgraph "External Threats"
        DDOS[DDoS Attacks]
        INJECTION[SQL/NoSQL Injection]
        XSS[Cross-Site Scripting]
        CSRF[CSRF Attacks]
        FRAUD[Identity Fraud]
    end
    
    subgraph "Security Layers"
        WAF[Web Application Firewall<br/>CloudFlare Protection]
        RATE_LIMIT[Rate Limiting<br/>API Throttling]
        INPUT_VALID[Input Validation<br/>Schema Enforcement]
        OUTPUT_ENCODE[Output Encoding<br/>XSS Prevention]
        CSRF_TOKEN[CSRF Tokens<br/>Request Validation]
    end
    
    subgraph "Authentication & Authorization"
        MULTI_FACTOR[Multi-Factor Auth<br/>Email + Phone + TOTP]
        JWT_AUTH[JWT Authentication<br/>Stateless Tokens]
        OAUTH2[OAuth2 Integration<br/>LinkedIn, GitHub]
        RBAC[Role-Based Access<br/>Permissions System]
        SESSION_MGT[Session Management<br/>Secure Storage]
    end
    
    subgraph "Data Protection"
        ENCRYPTION[Data Encryption<br/>AES-256 at Rest]
        TLS[TLS 1.3<br/>Data in Transit]
        HASHING[Password Hashing<br/>bcrypt + Salt]
        PII_MASK[PII Masking<br/>Sensitive Data]
        BACKUP_ENCRYPT[Encrypted Backups<br/>Secure Storage]
    end
    
    subgraph "Blockchain Security"
        PRIVATE_KEYS[Private Key Management<br/>HSM Storage]
        SMART_CONTRACT[Smart Contract Audits<br/>Security Reviews]
        MULTI_SIG[Multi-Signature Wallets<br/>Admin Operations]
        GAS_LIMIT[Gas Limit Controls<br/>DoS Prevention]
        ORACLE_SECURITY[Oracle Security<br/>Data Integrity]
    end
    
    subgraph "Monitoring & Response"
        SIEM[Security Information<br/>Event Management]
        ANOMALY[Anomaly Detection<br/>ML-based Monitoring]
        INCIDENT[Incident Response<br/>Automated Alerts]
        FORENSICS[Digital Forensics<br/>Audit Trails]
        COMPLIANCE[Compliance Monitoring<br/>Regulatory Requirements]
    end
    
    DDOS --> WAF
    INJECTION --> INPUT_VALID
    XSS --> OUTPUT_ENCODE
    CSRF --> CSRF_TOKEN
    FRAUD --> MULTI_FACTOR
    
    WAF --> RATE_LIMIT
    RATE_LIMIT --> INPUT_VALID
    INPUT_VALID --> JWT_AUTH
    JWT_AUTH --> RBAC
    
    RBAC --> ENCRYPTION
    ENCRYPTION --> TLS
    TLS --> PRIVATE_KEYS
    PRIVATE_KEYS --> SMART_CONTRACT
    
    SMART_CONTRACT --> SIEM
    SIEM --> ANOMALY
    ANOMALY --> INCIDENT
    INCIDENT --> FORENSICS
```

## 6. Deployment & Infrastructure Architecture

```mermaid
graph TB
    subgraph "CDN & Edge"
        CLOUDFLARE[CloudFlare CDN<br/>Global Edge Locations]
        EDGE_CACHE[Edge Caching<br/>Static Assets]
        DDoS_PROTECTION[DDoS Protection<br/>Traffic Filtering]
    end
    
    subgraph "Load Balancing"
        ALB[Application Load Balancer<br/>AWS ALB]
        HEALTH_CHECK[Health Checks<br/>Auto Failover]
        SSL_TERMINATION[SSL Termination<br/>Certificate Management]
    end
    
    subgraph "Application Tier - Production"
        PROD_WEB1[Web Server 1<br/>Node.js + Express]
        PROD_WEB2[Web Server 2<br/>Node.js + Express]
        PROD_WEB3[Web Server 3<br/>Node.js + Express]
        PROD_API1[API Server 1<br/>Microservices]
        PROD_API2[API Server 2<br/>Microservices]
    end
    
    subgraph "Application Tier - Staging"
        STAGE_WEB[Staging Web Server<br/>Testing Environment]
        STAGE_API[Staging API Server<br/>Pre-production]
    end
    
    subgraph "Database Tier"
        MONGO_PRIMARY[(MongoDB Primary<br/>Write Operations)]
        MONGO_SECONDARY1[(MongoDB Secondary 1<br/>Read Replica)]
        MONGO_SECONDARY2[(MongoDB Secondary 2<br/>Read Replica)]
        REDIS_CLUSTER[(Redis Cluster<br/>Cache + Sessions)]
    end
    
    subgraph "Storage Tier"
        S3_PROD[AWS S3 Production<br/>Document Storage]
        S3_BACKUP[AWS S3 Backup<br/>Automated Backups]
        IPFS_NODE[IPFS Node<br/>Decentralized Storage]
    end
    
    subgraph "Blockchain Infrastructure"
        INFURA[Infura RPC Nodes<br/>Polygon Network]
        ALCHEMY[Alchemy Backup<br/>Redundant Provider]
        LOCAL_NODE[Local Polygon Node<br/>High Availability]
    end
    
    subgraph "Monitoring & Logging"
        PROMETHEUS[Prometheus<br/>Metrics Collection]
        GRAFANA[Grafana<br/>Dashboards]
        ELK_STACK[ELK Stack<br/>Centralized Logging]
        ALERTMANAGER[Alert Manager<br/>Incident Response]
    end
    
    subgraph "CI/CD Pipeline"
        GITHUB[GitHub Repository<br/>Source Code]
        ACTIONS[GitHub Actions<br/>Automated Testing]
        DOCKER[Docker Registry<br/>Container Images]
        DEPLOYMENT[Automated Deployment<br/>Blue-Green Strategy]
    end
    
    CLOUDFLARE --> ALB
    ALB --> PROD_WEB1
    ALB --> PROD_WEB2
    ALB --> PROD_WEB3
    
    PROD_WEB1 --> PROD_API1
    PROD_WEB2 --> PROD_API2
    PROD_WEB3 --> PROD_API1
    
    PROD_API1 --> MONGO_PRIMARY
    PROD_API2 --> MONGO_SECONDARY1
    PROD_API1 --> REDIS_CLUSTER
    PROD_API2 --> REDIS_CLUSTER
    
    PROD_API1 --> S3_PROD
    PROD_API2 --> S3_PROD
    PROD_API1 --> INFURA
    PROD_API2 --> ALCHEMY
    
    MONGO_PRIMARY --> MONGO_SECONDARY1
    MONGO_PRIMARY --> MONGO_SECONDARY2
    S3_PROD --> S3_BACKUP
    
    PROD_WEB1 --> PROMETHEUS
    PROD_API1 --> ELK_STACK
    PROMETHEUS --> GRAFANA
    ELK_STACK --> ALERTMANAGER
    
    GITHUB --> ACTIONS
    ACTIONS --> DOCKER
    DOCKER --> DEPLOYMENT
    DEPLOYMENT --> STAGE_WEB
    DEPLOYMENT --> PROD_WEB1
```

## 7. Data Flow & Processing Architecture

```mermaid
graph TD
    subgraph "Data Ingestion"
        USER_INPUT[User Input<br/>Forms, Files, Actions]
        API_REQUESTS[API Requests<br/>Third-party Data]
        BLOCKCHAIN_EVENTS[Blockchain Events<br/>Smart Contract Logs]
        EXTERNAL_DATA[External Data<br/>Verification APIs]
    end
    
    subgraph "Data Processing Pipeline"
        VALIDATION[Data Validation<br/>Schema Checking]
        TRANSFORMATION[Data Transformation<br/>Normalization]
        ENRICHMENT[Data Enrichment<br/>Additional Context]
        BUSINESS_LOGIC[Business Logic<br/>Rules Engine]
    end
    
    subgraph "Data Storage"
        OPERATIONAL_DB[(Operational Database<br/>MongoDB)]
        CACHE_LAYER[(Cache Layer<br/>Redis)]
        FILE_STORAGE[(File Storage<br/>AWS S3 + IPFS)]
        BLOCKCHAIN_STORAGE[(Blockchain Storage<br/>Polygon Network)]
    end
    
    subgraph "Data Analytics"
        REAL_TIME[Real-time Analytics<br/>Stream Processing]
        BATCH_PROCESSING[Batch Processing<br/>Daily/Weekly Jobs]
        ML_PIPELINE[ML Pipeline<br/>Fraud Detection, Scoring]
        REPORTING[Reporting Engine<br/>Business Intelligence]
    end
    
    subgraph "Data Output"
        USER_DASHBOARD[User Dashboards<br/>Real-time Updates]
        API_RESPONSES[API Responses<br/>Structured Data]
        NOTIFICATIONS[Notifications<br/>Email, SMS, Push]
        BLOCKCHAIN_TX[Blockchain Transactions<br/>Immutable Records]
    end
    
    USER_INPUT --> VALIDATION
    API_REQUESTS --> VALIDATION
    BLOCKCHAIN_EVENTS --> TRANSFORMATION
    EXTERNAL_DATA --> ENRICHMENT
    
    VALIDATION --> TRANSFORMATION
    TRANSFORMATION --> ENRICHMENT
    ENRICHMENT --> BUSINESS_LOGIC
    
    BUSINESS_LOGIC --> OPERATIONAL_DB
    BUSINESS_LOGIC --> CACHE_LAYER
    BUSINESS_LOGIC --> FILE_STORAGE
    BUSINESS_LOGIC --> BLOCKCHAIN_STORAGE
    
    OPERATIONAL_DB --> REAL_TIME
    CACHE_LAYER --> REAL_TIME
    OPERATIONAL_DB --> BATCH_PROCESSING
    BLOCKCHAIN_EVENTS --> ML_PIPELINE
    
    REAL_TIME --> USER_DASHBOARD
    BATCH_PROCESSING --> REPORTING
    ML_PIPELINE --> API_RESPONSES
    BUSINESS_LOGIC --> NOTIFICATIONS
    BUSINESS_LOGIC --> BLOCKCHAIN_TX
    
    USER_DASHBOARD --> USER_INPUT
    API_RESPONSES --> API_REQUESTS
    BLOCKCHAIN_TX --> BLOCKCHAIN_EVENTS
```
