HamsterTracker
==============
A generalised tracking app

See a live version at hamstertracker.me
 
Concept and Features
--------------

This website enables users to track whichever subjects they would like to. Users are able to create a new tracking subject (eg Hamster Health), add attributes they will track (eg weight, food given, coat shinyness), and choose ranges and types for those attributes (eg integers from 1 - 5, floats greater than 0). 

They can then make entries in this subject and view those entries on a graph against time. Coupled with the table of correlations that automatically displays on the page, this makes the relationship between each of the attributes and how they have changed over time obvious.

On the graph itself, users can change which of the attributes are shown, and which shape of trendline is used for that attribute.

Technologies
--------------
Ruby
Rails
Backbone
Javascript
D3

Future todos (more to come)
--------------
- Add different shapes of trendlines
- Add ability for users to set email alerts (eg, if hamster weight reduces for two days in a row)
- Automatic choosing of best function for line of best fit
- View attributes graphed against other attributes (instead of time)
- Users can choose color for each attribute
