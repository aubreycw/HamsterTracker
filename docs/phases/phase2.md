# Phase 2: Adding and Viewing Subjects, Attributes, and Data Points

## Rails
### Models
* TrackingAttributes
* DataPoint

### Controllers
* Api::TrackingSubjectController (create, new, edit, destroy, show)
* Api::TrackingAttributesController (create, new, edit, destroy, show)
* Api::DataPointController (create, new, edit, destroy)

### Views
* tracking_subject/show.json.jbuilder
* tracking_attributes/show.json.jbuilder

## Backbone
### Models
* TrackingSubject
* TrackingAttribute
* DataPoint

### Collections
* TrackingSubjects
* TrackingAttributes
* DataPoints

### Views
* TrackingSubjectForm
* TrackingSubjectShow (composite view, contains TrackingAttributesListsubview)
* TrackingAttributesList (composite view, contains TrackingAttributesListItem subviews)
* TrackingAttributesListItem (composite view, contains DataPointsList subview)
* DataPointsList(composite view, contains DataPointsListItem subviews)
* DataPointsIndexItem

## Gems/Libraries
