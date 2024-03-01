

# Project Details

This is a website that can load, view, and search a provided CSV file; however, the current implementation exclusively uses mocked data.
Team members: Samuel Salseda (ssalseda) and Ian Zelbo (izelbo)
Total estimated time: 13 hours
repo link: https://github.com/cs0320-s24/mock-ssalseda-izelbo

# Design Choices

One of the primary design choices that affected our implementation of mock is the mocking itself. Instead of returning real results for queries of load and search, our inputs only return mocked data. Our program handles this through the use of a mocked.ts file which contains dictionaries which map input terms to results. This allows us to bypass any needed implementation of the csv functions. App is highest level component and manages login status and the repl. The user starts on the login screen which is handled by the LoginScreen file. After logging in we move to the REPLinput file which controls the users interactions post-login. The REPL file manages the props in this file and in REPLHistory. ControlledInput controls the inputs to the REPLInput. Once inputs have been processed into REPLInput, this class directs the execution of the command to one of the commands extending the ICommand interface, this allows for more developer freedom with implementation, instead of being restricted by a defined list of commands existing. The result of the execution is sent to REPLHistory where it is printed depending on the specification for how it should be handled.

# Errors/Bugs

So far we have encountered no bugs to our knowledge. This may be in part due to our use of only mocked data.

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

N/A