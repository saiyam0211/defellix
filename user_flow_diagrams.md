# User Flow Diagrams - Decentralized Freelancer Trust Platform

## 1. Freelancer Onboarding Flow

```mermaid
flowchart TD
    START([Freelancer Visits Platform]) --> LANDING[Landing Page<br/>Value Proposition]
    LANDING --> SIGNUP[Sign Up Form<br/>Email, Password, Name]
    SIGNUP --> EMAIL_VERIFY[Email Verification<br/>Click Link in Email]
    EMAIL_VERIFY --> PROFILE_SETUP[Profile Setup Wizard]
    
    PROFILE_SETUP --> BASIC_INFO[Basic Information<br/>Bio, Skills, Experience]
    BASIC_INFO --> PORTFOLIO[Portfolio Links<br/>GitHub, LinkedIn, Website]
    PORTFOLIO --> VERIFICATION[Verification Options<br/>Phone, LinkedIn, GitHub]
    
    VERIFICATION --> PHONE_VERIFY{Verify Phone?}
    PHONE_VERIFY -->|Yes| PHONE_OTP[Enter OTP<br/>+20% Score Weight]
    PHONE_VERIFY -->|Skip| LINKEDIN_VERIFY{Verify LinkedIn?}
    
    PHONE_OTP --> LINKEDIN_VERIFY
    LINKEDIN_VERIFY -->|Yes| LINKEDIN_AUTH[LinkedIn OAuth<br/>+50% Score Weight]
    LINKEDIN_VERIFY -->|Skip| GITHUB_VERIFY{Verify GitHub?}
    
    LINKEDIN_AUTH --> GITHUB_VERIFY
    GITHUB_VERIFY -->|Yes| GITHUB_AUTH[GitHub OAuth<br/>Portfolio Validation]
    GITHUB_VERIFY -->|Skip| ONBOARDING_COMPLETE
    
    GITHUB_AUTH --> ONBOARDING_COMPLETE[Onboarding Complete<br/>Initial Score: 100 RP]
    ONBOARDING_COMPLETE --> DASHBOARD[Freelancer Dashboard<br/>Create First Contract]
```

## 2. Contract Creation & Client Invitation Flow

```mermaid
flowchart TD
    DASHBOARD[Freelancer Dashboard] --> CREATE_CONTRACT[Create New Contract]
    CREATE_CONTRACT --> CONTRACT_FORM[Contract Form]
    
    CONTRACT_FORM --> PROJECT_DETAILS[Project Details<br/>Title, Description, Scope]
    PROJECT_DETAILS --> TIMELINE[Timeline & Milestones<br/>Deadlines, Deliverables]
    TIMELINE --> PAYMENT[Payment Terms<br/>Amount, Currency, Schedule]
    PAYMENT --> TERMS[Terms & Conditions<br/>Legal Clauses, IP Rights]
    
    TERMS --> PREVIEW[Contract Preview<br/>Review All Details]
    PREVIEW --> EDIT{Need Changes?}
    EDIT -->|Yes| CONTRACT_FORM
    EDIT -->|No| CLIENT_INFO[Client Information<br/>Name, Email, Company]
    
    CLIENT_INFO --> SEND_INVITE[Send Invitation<br/>Email to Client]
    SEND_INVITE --> BLOCKCHAIN_DRAFT[Store Draft on Blockchain<br/>Immutable Timestamp]
    BLOCKCHAIN_DRAFT --> CONFIRMATION[Invitation Sent<br/>Tracking Dashboard]
    
    CONFIRMATION --> WAIT_CLIENT[Wait for Client Response<br/>7-day Expiry Timer]
    WAIT_CLIENT --> CLIENT_RESPONSE{Client Response?}
    CLIENT_RESPONSE -->|Signed| CONTRACT_ACTIVE[Contract Active<br/>Project Begins]
    CLIENT_RESPONSE -->|Changes Requested| NEGOTIATE[Negotiation Mode<br/>Edit & Resend]
    CLIENT_RESPONSE -->|Rejected| CONTRACT_REJECTED[Contract Rejected<br/>Archive & Learn]
    CLIENT_RESPONSE -->|No Response| CONTRACT_EXPIRED[Contract Expired<br/>Follow-up Option]
    
    NEGOTIATE --> CONTRACT_FORM
```

## 3. Client Contract Review & Signing Flow

```mermaid
flowchart TD
    EMAIL_INVITE[Client Receives Email<br/>Contract Invitation] --> CLICK_LINK[Click Review Link<br/>No Account Required]
    CLICK_LINK --> CONTRACT_VIEW[Contract Review Page<br/>Full Details Visible]
    
    CONTRACT_VIEW --> FREELANCER_PROFILE[View Freelancer Profile<br/>Reputation, Past Work]
    FREELANCER_PROFILE --> DECISION{Accept Contract?}
    
    DECISION -->|Need Changes| REQUEST_CHANGES[Request Changes<br/>Comment Form]
    DECISION -->|Reject| REJECT_CONTRACT[Reject Contract<br/>Optional Feedback]
    DECISION -->|Accept| CLIENT_SIGNUP[Quick Client Signup<br/>Name, Email, Password]
    
    REQUEST_CHANGES --> SEND_FEEDBACK[Send to Freelancer<br/>Negotiation Mode]
    REJECT_CONTRACT --> REJECTION_SENT[Rejection Sent<br/>Freelancer Notified]
    
    CLIENT_SIGNUP --> COMPANY_INFO[Company Information<br/>Optional Business Details]
    COMPANY_INFO --> VERIFY_EMAIL[Verify Email Address<br/>Click Confirmation Link]
    VERIFY_EMAIL --> BUSINESS_VERIFY{Verify Business?}
    
    BUSINESS_VERIFY -->|Yes| BUSINESS_DOCS[Upload Business Docs<br/>GST, Company Registration]
    BUSINESS_VERIFY -->|Skip| DIGITAL_SIGNATURE[Digital Signature<br/>Type Name + Consent]
    
    BUSINESS_DOCS --> BUSINESS_REVIEW[Business Verification<br/>Manual Review Process]
    BUSINESS_REVIEW --> DIGITAL_SIGNATURE
    
    DIGITAL_SIGNATURE --> SIGNATURE_CONFIRM[Signature Confirmation<br/>Legal Binding Notice]
    SIGNATURE_CONFIRM --> BLOCKCHAIN_SIGN[Record Signature<br/>Blockchain Timestamp]
    BLOCKCHAIN_SIGN --> CONTRACT_SIGNED[Contract Signed<br/>Both Parties Notified]
    
    SEND_FEEDBACK --> FREELANCER_NOTIFIED[Freelancer Gets Feedback<br/>Can Edit & Resend]
    REJECTION_SENT --> PROCESS_END[Process Ends<br/>Archive Contract]
    CONTRACT_SIGNED --> PROJECT_DASHBOARD[Project Dashboard<br/>Active Contract Management]
```

## 4. Project Management & Milestone Flow

```mermaid
flowchart TD
    ACTIVE_CONTRACT[Active Contract<br/>Project Dashboard] --> MILESTONE_VIEW[View Milestones<br/>Timeline & Progress]
    MILESTONE_VIEW --> CURRENT_MILESTONE[Current Milestone<br/>Work in Progress]
    
    CURRENT_MILESTONE --> FREELANCER_WORK[Freelancer Works<br/>External to Platform]
    FREELANCER_WORK --> SUBMIT_WORK[Submit Deliverable<br/>Files + Description]
    
    SUBMIT_WORK --> UPLOAD_FILES[Upload Files<br/>Documents, Images, Links]
    UPLOAD_FILES --> SUBMISSION_NOTES[Submission Notes<br/>Explain Deliverable]
    SUBMISSION_NOTES --> SUBMIT_CONFIRM[Submit for Review<br/>Notify Client]
    
    SUBMIT_CONFIRM --> CLIENT_NOTIFIED[Client Notification<br/>Email + Dashboard Alert]
    CLIENT_NOTIFIED --> CLIENT_REVIEW[Client Reviews Work<br/>Download & Examine]
    
    CLIENT_REVIEW --> CLIENT_DECISION{Approve Work?}
    CLIENT_DECISION -->|Approve| MILESTONE_APPROVED[Milestone Approved<br/>Payment Request]
    CLIENT_DECISION -->|Request Changes| REQUEST_REVISION[Request Revision<br/>Feedback to Freelancer]
    CLIENT_DECISION -->|Major Issues| RAISE_DISPUTE[Raise Dispute<br/>Formal Process]
    
    REQUEST_REVISION --> REVISION_FEEDBACK[Detailed Feedback<br/>What Needs Changing]
    REVISION_FEEDBACK --> FREELANCER_REVISE[Freelancer Revises<br/>Back to Work]
    FREELANCER_REVISE --> SUBMIT_WORK
    
    MILESTONE_APPROVED --> PAYMENT_REQUEST[Payment Request<br/>Invoice Generated]
    PAYMENT_REQUEST --> PAYMENT_PROCESS[Payment Process<br/>Direct Transfer]
    
    PAYMENT_PROCESS --> FREELANCER_PAID[Freelancer Receives Payment<br/>Bank/UPI/PayPal]
    FREELANCER_PAID --> MARK_PAID[Mark Payment Received<br/>Upload Proof]
    MARK_PAID --> CLIENT_CONFIRM[Client Confirms Payment<br/>One-Click Confirmation]
    
    CLIENT_CONFIRM --> MILESTONE_COMPLETE[Milestone Complete<br/>Blockchain Record]
    MILESTONE_COMPLETE --> MORE_MILESTONES{More Milestones?}
    MORE_MILESTONES -->|Yes| NEXT_MILESTONE[Next Milestone<br/>Continue Project]
    MORE_MILESTONES -->|No| PROJECT_COMPLETE[Project Complete<br/>Ready for Closure]
    
    NEXT_MILESTONE --> CURRENT_MILESTONE
    PROJECT_COMPLETE --> RATING_PROCESS[Rating Process<br/>Mutual Evaluation]
    
    RAISE_DISPUTE --> DISPUTE_PROCESS[Dispute Resolution<br/>Separate Flow]
```

## 5. Rating & Contract Closure Flow

```mermaid
flowchart TD
    PROJECT_COMPLETE[All Milestones Complete<br/>Payment Confirmed] --> CLOSURE_INIT[Initiate Contract Closure<br/>System Notification]
    
    CLOSURE_INIT --> CLIENT_RATING[Client Rating Form<br/>Rate Freelancer Work]
    CLIENT_RATING --> RATING_CATEGORIES[Rating Categories<br/>Quality, Communication, Timeliness]
    RATING_CATEGORIES --> OVERALL_SCORE[Overall Score<br/>1-10 Scale]
    OVERALL_SCORE --> WRITTEN_FEEDBACK[Written Feedback<br/>Optional Testimonial]
    WRITTEN_FEEDBACK --> RATING_SUBMIT[Submit Rating<br/>Confirm & Send]
    
    RATING_SUBMIT --> FREELANCER_RATING[Freelancer Rating Form<br/>Rate Client Experience]
    FREELANCER_RATING --> CLIENT_CATEGORIES[Client Categories<br/>Communication, Payment, Clarity]
    CLIENT_CATEGORIES --> CLIENT_SCORE[Client Score<br/>1-10 Scale]
    CLIENT_SCORE --> CLIENT_FEEDBACK[Client Feedback<br/>Optional Review]
    CLIENT_FEEDBACK --> FL_RATING_SUBMIT[Submit Client Rating<br/>Mutual Evaluation]
    
    FL_RATING_SUBMIT --> SCORE_CALCULATION[Calculate Reputation Update<br/>Weighted Algorithm]
    SCORE_CALCULATION --> BONUS_CHECK[Check Bonus Multipliers<br/>Verified Client, Early Delivery]
    BONUS_CHECK --> PENALTY_CHECK[Check Penalties<br/>Late Delivery, Issues]
    PENALTY_CHECK --> FINAL_SCORE[Final Score Calculation<br/>Update Reputation Points]
    
    FINAL_SCORE --> BLOCKCHAIN_RECORD[Record on Blockchain<br/>Immutable Rating & Score]
    BLOCKCHAIN_RECORD --> TIER_UPDATE[Update Tier & Badges<br/>Elite, Trusted, Verified]
    TIER_UPDATE --> PROFILE_UPDATE[Update Public Profile<br/>New Score & Testimonial]
    
    PROFILE_UPDATE --> CONTRACT_CLOSED[Contract Officially Closed<br/>Success Notification]
    CONTRACT_CLOSED --> PORTFOLIO_UPDATE[Portfolio Enhancement<br/>Add Completed Project]
    PORTFOLIO_UPDATE --> SHARE_PROFILE[Share Updated Profile<br/>Future Client Outreach]
    
    SHARE_PROFILE --> ANALYTICS[View Analytics<br/>Score Trends, Performance]
    ANALYTICS --> NEXT_PROJECT[Ready for Next Project<br/>Enhanced Credibility]
```

## 6. Dispute Resolution User Flow

```mermaid
flowchart TD
    ISSUE_ARISES[Project Issue<br/>Payment/Quality/Communication] --> WHO_RAISES{Who Raises Dispute?}
    
    WHO_RAISES -->|Freelancer| FL_DISPUTE[Freelancer Raises Dispute<br/>Payment/Scope Issues]
    WHO_RAISES -->|Client| CL_DISPUTE[Client Raises Dispute<br/>Quality/Delivery Issues]
    
    FL_DISPUTE --> FL_EVIDENCE[Freelancer Evidence<br/>Chat Logs, Work Samples]
    CL_DISPUTE --> CL_EVIDENCE[Client Evidence<br/>Requirements, Communications]
    
    FL_EVIDENCE --> DISPUTE_FORM[Dispute Form<br/>Issue Type & Description]
    CL_EVIDENCE --> DISPUTE_FORM
    
    DISPUTE_FORM --> EVIDENCE_UPLOAD[Upload Evidence<br/>Screenshots, Files, Messages]
    EVIDENCE_UPLOAD --> DISPUTE_SUBMIT[Submit Dispute<br/>Formal Process Begins]
    
    DISPUTE_SUBMIT --> OTHER_PARTY[Notify Other Party<br/>Response Required]
    OTHER_PARTY --> RESPONSE_TIME[48-Hour Response<br/>Counter-Evidence]
    
    RESPONSE_TIME --> AUTO_ANALYSIS[Automated Analysis<br/>Contract Terms Check]
    AUTO_ANALYSIS --> CLEAR_VIOLATION{Clear Contract Violation?}
    
    CLEAR_VIOLATION -->|Yes| AUTO_RESOLUTION[Automatic Resolution<br/>Apply Contract Terms]
    CLEAR_VIOLATION -->|No| HUMAN_REVIEW[Human Mediator Review<br/>Manual Investigation]
    
    AUTO_RESOLUTION --> RESOLUTION_APPLIED[Apply Resolution<br/>RP Adjustment/Refund]
    
    HUMAN_REVIEW --> MEDIATOR_CONTACT[Mediator Contacts Parties<br/>Gather More Information]
    MEDIATOR_CONTACT --> MEDIATION_CALL[Optional Mediation Call<br/>Discuss Resolution]
    MEDIATION_CALL --> MEDIATOR_DECISION[Mediator Decision<br/>Binding Resolution]
    
    MEDIATOR_DECISION --> PARTIES_ACCEPT{Both Parties Accept?}
    PARTIES_ACCEPT -->|Yes| RESOLUTION_APPLIED
    PARTIES_ACCEPT -->|No| ESCALATION_OPTION[Legal Escalation Option<br/>Evidence Package]
    
    ESCALATION_OPTION --> EVIDENCE_PACKAGE[Generate Evidence Package<br/>Blockchain Proofs + Docs]
    EVIDENCE_PACKAGE --> LEGAL_TEMPLATE[Legal Notice Template<br/>Small Claims Court Ready]
    LEGAL_TEMPLATE --> EXTERNAL_LEGAL[External Legal Process<br/>Outside Platform]
    
    RESOLUTION_APPLIED --> BLOCKCHAIN_LOG[Log Resolution<br/>Immutable Record]
    BLOCKCHAIN_LOG --> REP_IMPACT[Reputation Impact<br/>Score Adjustments]
    REP_IMPACT --> DISPUTE_CLOSED[Dispute Closed<br/>Both Parties Notified]
    
    EXTERNAL_LEGAL --> PLATFORM_SUPPORT[Platform Provides Support<br/>Evidence & Documentation]
```

## 7. Verification Process Flow

```mermaid
flowchart TD
    PROFILE_SETUP[User Profile Setup<br/>Basic Information] --> VERIFY_OPTIONS[Verification Options<br/>Multiple Tiers Available]
    
    VERIFY_OPTIONS --> EMAIL_VERIFY[Email Verification<br/>Required for All Users]
    EMAIL_VERIFY --> EMAIL_SENT[Verification Email Sent<br/>Click Link to Confirm]
    EMAIL_SENT --> EMAIL_CONFIRMED[Email Confirmed<br/>Basic Verification Complete]
    
    EMAIL_CONFIRMED --> PHONE_OPTION{Verify Phone Number?}
    PHONE_OPTION -->|Yes| PHONE_INPUT[Enter Phone Number<br/>Country Code + Number]
    PHONE_OPTION -->|Skip| SOCIAL_OPTIONS[Social Media Verification<br/>LinkedIn, GitHub]
    
    PHONE_INPUT --> PHONE_OTP[Send OTP<br/>SMS Verification Code]
    PHONE_OTP --> OTP_INPUT[Enter OTP Code<br/>6-Digit Verification]
    OTP_INPUT --> OTP_VALID{Valid OTP?}
    OTP_VALID -->|No| OTP_RETRY[Retry OTP<br/>3 Attempts Max]
    OTP_VALID -->|Yes| PHONE_VERIFIED[Phone Verified<br/>+20% Score Weight]
    
    OTP_RETRY --> PHONE_OTP
    PHONE_VERIFIED --> SOCIAL_OPTIONS
    
    SOCIAL_OPTIONS --> LINKEDIN_OPTION{Verify LinkedIn?}
    LINKEDIN_OPTION -->|Yes| LINKEDIN_OAUTH[LinkedIn OAuth<br/>Connect Account]
    LINKEDIN_OPTION -->|Skip| GITHUB_OPTION{Verify GitHub?}
    
    LINKEDIN_OAUTH --> LINKEDIN_PROFILE[Fetch LinkedIn Profile<br/>Work History, Connections]
    LINKEDIN_PROFILE --> LINKEDIN_VALIDATE[Validate Profile<br/>Real Person Check]
    LINKEDIN_VALIDATE --> LINKEDIN_VERIFIED[LinkedIn Verified<br/>+50% Score Weight]
    
    LINKEDIN_VERIFIED --> GITHUB_OPTION
    GITHUB_OPTION -->|Yes| GITHUB_OAUTH[GitHub OAuth<br/>Connect Repository]
    GITHUB_OPTION -->|Skip| BUSINESS_OPTION{Business Verification?}
    
    GITHUB_OAUTH --> GITHUB_REPOS[Analyze Repositories<br/>Code Quality, Activity]
    GITHUB_REPOS --> GITHUB_SCORE[GitHub Score<br/>Portfolio Validation]
    GITHUB_SCORE --> GITHUB_VERIFIED[GitHub Verified<br/>Technical Credibility]
    
    GITHUB_VERIFIED --> BUSINESS_OPTION
    BUSINESS_OPTION -->|Yes| BUSINESS_DOCS[Upload Business Documents<br/>GST, Registration, PAN]
    BUSINESS_OPTION -->|Skip| VERIFICATION_COMPLETE[Verification Complete<br/>Calculate Final Score]
    
    BUSINESS_DOCS --> DOC_REVIEW[Document Review<br/>Manual Verification]
    DOC_REVIEW --> DOC_VALID{Documents Valid?}
    DOC_VALID -->|No| DOC_REJECTED[Documents Rejected<br/>Resubmit Required]
    DOC_VALID -->|Yes| BUSINESS_VERIFIED[Business Verified<br/>Premium Client Status]
    
    DOC_REJECTED --> BUSINESS_DOCS
    BUSINESS_VERIFIED --> VERIFICATION_COMPLETE
    
    VERIFICATION_COMPLETE --> SCORE_CALCULATION[Calculate Verification Score<br/>Weighted Algorithm]
    SCORE_CALCULATION --> BADGE_ASSIGNMENT[Assign Verification Badges<br/>Trusted, Elite, Verified]
    BADGE_ASSIGNMENT --> PROFILE_UPDATE[Update Public Profile<br/>Show Verification Status]
    PROFILE_UPDATE --> VERIFICATION_DONE[Verification Process Complete<br/>Enhanced Credibility]
```
