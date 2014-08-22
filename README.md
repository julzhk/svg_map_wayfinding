Map wayfinding by interogating an SVG graphic file
==================

The Victoria & Albert museum digital map ( http://www.vam.ac.uk/map ) uses a complex SVG. This spike uses javascript to examine the map file itself to extract a shortest path between any two rooms on a level in this vast & confusingly arranged space.

This proof-of-concept uses the underscore.js library, & a naive pathfinding algorithm.

To-do
====

- Label rooms in the SVG with human-readable names
- allow user interaction: click 'start' & 'end' rooms to calculate paths between
- Find paths between floors
- Highlight the path graphically
