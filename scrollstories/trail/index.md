---
title: The Old Spanish Trail
author: Fred Gibbs
layout: scrollstory
date: 2026-08-20
summary: "A story map demo: a pack-mule route from Santa Fe to Los Angeles, drawn over the government survey that helped replace it."
header-image: /assets/images/maps/whipple-1854.webp
header-title: The Old Spanish Trail
header-eyebrow: Story Map Demo
header-subtitle: a mule road from Santa Fe to Los Angeles
header-divider: ✦ ✦ ✦
header-caption: Lt. A. W. Whipple, <em>Route Near the 35th Parallel, Map No. 2</em>, 1854. Pacific Railroad Survey, War Department.
geo: [35.688, -105.938]
placename: Santa Fe, New Mexico
story-tabs:
  - title: Santa Fe
    section: Santa Fe
  - title: The Northern Route
    section: The Northern Route
  - title: The Mojave
    section: The Mojave
  - title: Los Angeles
    section: Los Angeles
  - title: Forest story
    url: /scrollstories/forest/
tags:
  - maps
---

Between 1829 and the late 1840s, caravans of pack mules crossed twelve hundred miles of desert and canyon between Santa Fe and Los Angeles. There was never one Old Spanish Trail. There were several, braided together and chosen according to water, weather, and how much a party was willing to risk.

The map underneath this essay is not a map of that trail. It is Lieutenant Amiel Weeks Whipple's survey of a possible railroad route near the 35th parallel, made for the War Department in 1853 and 1854 — a document produced by the government that would shortly make the mule road obsolete. Watching the trail move across a map drawn for a different purpose is a good deal of what reading historical maps consists of.

{% include maps/story-map.html map-id="trail"
   overlay-image="/assets/images/maps/whipple-1854.webp"
   overlay-bounds="32.45416, -119.73999, 37.10777, -106.34216"
   overlay-alt="Whipple's 1854 manuscript survey map of the country between the Rio Grande and the Pacific, showing mountain ranges in hachure"
   overlay-opacity="0.92"
   geojson="/assets/data/old-spanish-trail.geojson"
   basemap="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
   basemap-attribution="&copy; OpenStreetMap contributors"
   attribution="Trail data: National Park Service. Historic map: Whipple survey, 1854."
   center="35.9, -112.0"
   zoom="6" %}

{% include maps/story-map-panel.html map-id="trail" center="35.688, -105.938" zoom="9" panel-align="left" %}
## Santa Fe

Everything started here. Wool from New Mexican looms — serapes, blankets, coarse cloth — was loaded onto mules in the plaza outside the Palace of the Governors and pointed northwest. New Mexico had weavers and no horses to speak of. California had horses and mules in enormous numbers and no weavers. The trail existed because of that asymmetry.

Click the marker to see what the Park Service says about the site.
{% include maps/story-map-panel-end.html %}

{% include maps/story-map-panel.html map-id="trail" highlight="Armijo Route" zoom="6" center="35.9, -111.5" panel-align="right" %}
## Armijo's crossing, 1829

Antonio Armijo took sixty men and a string of mules out of Abiquiú in November 1829 and reached the San Gabriel mission the following January. His was the first commercial caravan to make the trip and return, and the route that carries his name is highlighted here.

It is a southern line, running below the canyon country. Later parties mostly abandoned it.
{% include maps/story-map-panel-end.html %}

{% include maps/story-map-panel.html map-id="trail" highlight="Northern Route" zoom="6" center="37.5, -111.5" panel-align="left" %}
## The Northern Route

The route that became standard swings far north instead, through what is now Utah, before turning southwest toward the Mojave. It is longer. It has water.

Notice that it climbs off the top of the historic sheet. Whipple was surveying the 35th parallel, and the caravans went well north of it — so the main trail simply leaves his map. The gap is not an error in the data or in the georeferencing. It is the difference between what a mule train needed and what a railroad survey was looking for.
{% include maps/story-map-panel-end.html %}

{% include maps/story-map-panel.html map-id="trail" highlight="Mojave Road" zoom="8" center="35.3, -116.0" panel-align="right" %}
## The Mojave

The worst of it came last. Between the Virgin River and the Mojave River lay a stretch that parties crossed at night, moving between springs they had to know about in advance.

This is also the stretch where the trail's other traffic is hardest to leave out. Caravans raided Ute and Paiute communities along the corridor and carried captured women and children to California to sell. That trade ran alongside the wool and the horses for as long as the route did.
{% include maps/story-map-panel-end.html %}

{% include maps/story-map-panel.html map-id="trail" center="34.06, -118.24" zoom="9" opacity="0.55" panel-align="left" %}
## Los Angeles

The far end was the pueblo of Los Angeles and the missions around it. A caravan that left Santa Fe in November arrived some time in February, traded through the spring, and started back with horses before the desert became impassable.

The overlay is fading here because the trail has reached the edge of Whipple's sheet. Past the western margin there is nothing under the route but the modern basemap.
{% include maps/story-map-panel-end.html %}

{% include maps/story-map-end.html %}

Congress designated the corridor a National Historic Trail in 2002. What that designation protects is mostly not a road — traces on the ground are faint and scattered — but a set of coordinates, of the kind drawn on the map above.

## The same map, standing still

The pinned version above is one way to use a historic map. The other is to put it in the text like any other figure and let the reader poke at it:

{% include maps/figure-map.html
   overlay-image="/assets/images/maps/whipple-1854.webp"
   overlay-bounds="32.45416, -119.73999, 37.10777, -106.34216"
   overlay-alt="Whipple's 1854 survey map with the routes of the Old Spanish Trail drawn over it"
   geojson="/assets/data/old-spanish-trail.geojson"
   height="30rem"
   caption="Whipple's 1854 survey, with the routes of the Old Spanish Trail drawn over it. Drag to pan; the markers open. Trail data: National Park Service."
   attribution="NPS; Whipple survey, 1854." %}

Both components take the same parameters. The difference is whether the map holds still while the reader scrolls past it, or the reader holds still and moves the map.
