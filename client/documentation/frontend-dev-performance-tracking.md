# Implementation

To handle the arrays of text data and track the performance of the user, there is a string that corresponds to the intended text data 
to be typed, which includes newline `\n`, tab `\t`, and space characters. 

This is compared character by character to the user's actual input to record ONLY valid data. The snapshot data is updated only for the first time that the user enters the correct character, and ignores the user backspacing a valid character 

Rather than calculating the wpm of all user input, only the length of this valid input snapshot is recorded each second, and represents the "characters typed per second" metric. The average of each point with its adjacent points are processed to create a smooting effect of the daya (see `smoothen(data)`). This is to prevent the WPM from dropping to zero if the user were to stop typing. 

# Relevant Methods 

 - `smoothen(data)`
    - Tracks users performance over time and smoothens WPM by accounting for mistakes and inactivity 
    - Takes in raw typing data with each ach int corresponds to char/sec
    - WPM is calculated by dividing certain `data` element by number of characters per word and multiplying it by number of seconds per minute 
    Function iterates over 'data' array 
    - Used in `GameSummary.js` to report results of wpm
