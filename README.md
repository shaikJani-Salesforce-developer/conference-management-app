# Conference Management App

A Salesforce application developed to manage conference speakers, sessions, and speaker assignments. The application includes custom objects, Apex automation, and Lightning Web Components (LWC) to simplify speaker management and prevent scheduling conflicts.

## Features

### Conference Management
- Manage Speakers with Name, Email, Bio, and Speciality.
- Manage Conference Sessions with Date, Start Time, End Time, and Skill Level.
- Assign Speakers to Sessions using a junction object.

### Conflict Detection
- Implemented an Apex Trigger to prevent speakers from being assigned to overlapping sessions.
- Validates speaker availability before creating assignments.
- Displays an error when scheduling conflicts are detected.
- Bulk-safe implementation using Apex Collections.

### Speaker Manager (Lightning Web Components)

#### Speaker Search
- Search speakers by Name.
- Filter speakers by Speciality.
- Display matching speakers in a Lightning Data Table.

#### Speaker Details
- Display speaker Bio and Speciality.
- Select a future session date.
- Check speaker availability using Apex.

#### Session Assignment
- Create Speaker Assignments directly from the LWC.
- Prevent duplicate or overlapping bookings.
- Display success and error toast messages.

### Component Communication
- Parent-to-Child communication
- Child-to-Parent communication
- Lightning Message Service (LMS) for component communication

## Salesforce Technologies

- Apex
- Apex Triggers
- SOQL
- Collections
- Lightning Web Components (LWC)
- Lightning Message Service (LMS)
- Custom Objects
- Validation Logic
- Lightning Data Table
- Toast Notifications

## Custom Objects

- Speaker__c
- Session__c
- Speaker_Assignment__c

## Business Rules

- Speakers cannot be assigned to overlapping sessions.
- Session booking is allowed only for future dates.
- Availability is validated before assignment creation.

## Project Structure

```
force-app
 ├── classes
 ├── lwc
 ├── objects
 ├── triggers
 ├── messageChannels
 └── applications
```

## Skills Demonstrated

- Salesforce Development
- Apex Programming
- Bulkified Trigger Design
- SOQL Optimization
- Collection Framework
- Lightning Web Components
- Component Communication
- Salesforce Data Modeling
- Business Validation
- Error Handling

## Screenshots

> Add screenshots of:
- Speaker Search
- Speaker List
- Speaker Details
- Session Assignment
- Conference App
- Conflict Validation
