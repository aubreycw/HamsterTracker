# Hamster Tracker

[Heroku link][heroku]

<!-- TODO -->

[heroku]: http://www.google.com

## Minimum Viable Product
Hamster Tracker is a general tracking app, which makes understanding the relationships between your tracked data easy. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create accounts
- [ ] Create sessions (log in)
- [ ] Create tracking subjects (hamster health)
- [ ] Create tracking subject attributes (weight, shinyness, walnuts eaten)
- [ ] Choose range and type of attributes (weight is a float, shinyness is an int from 0 to 5)
- [ ] Enter data points
- [ ] View a graph of each tracking subject (against time)
- [ ] Change which attributes are displayed on the graph
- [ ] View a table of correlations for each tracking subject
- [ ] Choose which other users can view and add data to thier tracking subjects

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Tracking Subject Creation (~1 day)
I will implement user authentication (using the Rails pattern used at App Academy). 

By the end of this phase users will be able to sign in, sign up, and create (and delete) tracking subjects from a form on the webpage. I will have the app pushed to Heroku.

[Details][phase-one]

### Phase 2: Adding and Viewing Subjects, Attributes, and Data Points (~2 days)
I will add API routes and the necessary Backbone methods (routers, views, collections, and models) for users to create and delete tracking attributes and data points. I will use Bootstrap now and throughout the rest of the project. 

By the end of this phase users will be able to create, edit, delete, and view tracking subjects, tracking attributes, and data points in a single page Backbone app.

[Details][phase-two]

### Phase 3: Implementing Basic Graphs (~2 days)
I will change the Tracking Subject show page to contain a graph (replacing the list of tracking attributes with sub lists of thier data points). I will utilise javascripts D3 library for this stage of the project.

By the end of this phase users will be able to view a graph with all of the data points for each attribute within a tracking subject, and will be able to toggle which of these attributes are visible.

[Details][phase-three]

### Phase 4: Add correlations table (~1 day)
I will add a color coded table of correlations beside the graph in the Tracking subject view.

By the end of this phase users will be able to see the correlations between each of the attributes for each tracking subect.

[Details][phase-four]

### Phase 5: Add Tracking Subject Sharing Abilities (~1 day)
I will add graph sharing abilities.

By the end of this phase users will be able to search for and select other users who will be allowed to read and/or contribute to specific graph subjects, and users will be able to view all tracking subjects they either own of have access to in their index page.

[Details][phase-five]

### Phase 6: Prettifying (~1-2 days)
I will change bootstrap/css/javascript files to make the app more attractive, and will check that everything is working before moving on to bonus features.

### Bonus Features (TBD)
- [ ] Linear lines of best fit on graphs
- [ ] Non linear options for lines of best fit
- [ ] Automatic choosing of best function for line of best fit
- [ ] View attributes graphed against other attributes (instead of time)

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md



