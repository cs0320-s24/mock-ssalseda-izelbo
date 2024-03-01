> **GETTING STARTED:** You should likely start with the `/mock` folder from your solution code for the mock gearup.

# Project Details

This is a website that can load, view, and search a provided CSV file; however, the current implementation exclusively uses mocked data.
Team members: Samuel Salseda (ssalseda) and Ian Zelbo (izelbo)
Total estimated time: 13 hours
repo link: https://github.com/cs0320-s24/mock-ssalseda-izelbo

# Design Choices

# Errors/Bugs

# Tests

To run the tests cd into the "mock" directory and run the command "npm run test:e2e" in your terminal

# How to

To run this website, first cd into the "mock" directory. Once in the proper directory, run "npm start" and proceed to "localhost:8000" in your
browser. To enter the website, use the username "admin" and the password "password." Once entered, you will have four commands at your disposal.
Entering "mode" with no arguments will change the mode. The default is "brief" and the alternative is "verbose." Mode can be entered as many times
and will always switch the output. Brief will not show the input command while verbose will. Next is load, it should be entered as "load <file>", and
since we are using mocked data, out file names should match our data. Next up is "view" which has no arguments and prints the csv. Lastly is "search" which takes in an index or header and a search term in that order (i.e. "search 2 red"). This will print all strings that have a matching term in that
column.

# Collaboration

_(state all of your sources of collaboration past your project partner. Please refer to the course's collaboration policy for any further questions.)_
