var display = document.getElementById("display")
var display_played = document.getElementById("display_played")
var notes = document.getElementById("notes")


var current_notes = []
var octaves = [
    [0, "C"],
    [1, "C#"],
    [2, "D"],
    [3, "D#"],
    [4, "E"],
    [5, "F"],
    [6, "F#"],
    [7, "G"],
    [8, "G#"],
    [9, "A"],
    [10, "A#"],
    [11, "B"],
    [12, "C"],
    [13, "C#"],
    [14, "D"],
    [15, "D#"],
    [16, "E"],
    [17, "F"],
    [18, "F#"],
    [19, "G"],
    [20, "G#"],
    [21, "A"],
    [22, "A#"],
    [23, "B"],
    [24, "C"],
    [25, "C#"],
    [26, "D"],
    [27, "D#"],
    [28, "E"],
    [29, "F"],
    [30, "F#"],
    [31, "G"],
    [32, "G#"],
    [33, "A"],
    [34, "A#"],
    [35, "B"],
    [36, "C"],
    [37, "C#"],
    [38, "D"],
    [39, "D#"],
    [40, "E"],
    [41, "F"],
    [42, "F#"],
    [43, "G"],
    [44, "G#"],
    [45, "A"],
    [46, "A#"],
    [47, "B"],
    [48, "C"],
    [49, "C#"],
    [50, "D"],
    [51, "D#"],
    [52, "E"],
    [53, "F"],
    [54, "F#"],
    [55, "G"],
    [56, "G#"],
    [57, "A"],
    [58, "A#"],
    [59, "B"],
    [60, "C"],
    [61, "C#"],
    [62, "D"],
    [63, "D#"],
    [64, "E"],
    [65, "F"],
    [66, "F#"],
    [67, "G"],
    [68, "G#"],
    [69, "A"],
    [70, "A#"],
    [71, "B"],
    [72, "C"],
    [73, "C#"],
    [74, "D"],
    [75, "D#"],
    [76, "E"],
    [77, "F"],
    [78, "F#"],
    [79, "G"],
    [80, "G#"],
    [81, "A"],
    [82, "A#"],
    [83, "B"],
    [84, "C"],
    [85, "C#"],
    [86, "D"],
    [87, "D#"],
    [88, "E"],
    [89, "F"],
    [90, "F#"],
    [91, "G"],
    [92, "G#"],
    [93, "A"],
    [94, "A#"],
    [95, "B"],
    [96, "C"],
    [97, "C#"],
    [98, "D"],
    [99, "D#"],
    [100, "E"],
    [101, "F"],
    [102, "F#"],
    [103, "G"],
    [104, "G#"],
    [105, "A"],
    [106, "A#"],
    [107, "B"],
    [108, "C"],
    [109, "C#"],
    [110, "D"],
    [111, "D#"],
    [112, "E"],
    [113, "F"],
    [114, "F#"],
    [115, "G"],
    [116, "G#"],
    [117, "A"],
    [118, "A#"],
    [119, "B"],
    [120, "C"],
    [121, "C#"],
    [122, "D"],
    [123, "D#"],
    [124, "E"],
    [125, "F"],
    [126, "F#"],
    [127, "G"],
];

var chords = [
    ["C","E","G", "CMaj"],
    ["C","E#","G", "CMin"],
    ["C#","F","G#", "C#Maj"],
    ["C#","E","G#", "C#Min"],
    ["D","F#","A", "DMaj"],
    ["D","F","A", "DMin"],
    ["D#","G","A#", "D#Maj"],
    ["D#","F#","A#", "D#Min"],
    ["E","G#","B", "EMaj"],
    ["E","G","B", "EMin"],
    ["F","A","C", "FMaj"],
    ["F","A#","C", "FMin"],
    ["F#","A#","C#", "F#Maj"],
    ["F#","A","C#", "F#Min"],
    ["G","B","D", "GMaj"],
    ["G","B#","D", "GMin"],
    ["G#","C","D#", "G#Maj"],
    ["G#","B","D#", "G#Min"],
    ["A","C#","E", "AMaj"],
    ["A","C","E", "AMin"],
    ["A#","D","F", "A#Maj"],
    ["A#","D#","F", "A#Min"],
    ["B","D#","F#", "BMaj"],
    ["B","D","F#", "BMin"],
];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

display.innerHTML = chords[getRandomInt(0,chords.length)][3]

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
    var inputs = midiAccess.inputs;
    var outputs = midiAccess.outputs;
    for (var input of inputs.values()) {
        input.onmidimessage = getMIDIMessage;
    }
}

function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}

function getMIDIMessage(midiMessage) {
    var command = midiMessage.data[0];
    var note = midiMessage.data[1];
    var velocity = (midiMessage.data.length > 2) ? midiMessage.data[2] : 0;
    if(midiMessage.data[0] != 248)console.log(midiMessage)

    if(midiMessage.data[2] == 0){
        current_notes = []
    } else {
        if (command == 144) {
            var key = octaves[note][1]
            current_notes.push(key)
            notes.innerHTML = current_notes

            if(current_notes.length == 3){
                for(let i in chords){
                    let chordNotes = chords[i].slice(0, 3); // Get the notes of the chord
                    if(current_notes.every(note => chordNotes.includes(note))){
                        display_played.innerHTML = chords[i][3]
                        if(display.innerHTML == chords[i][3]){
                            display.innerHTML = chords[getRandomInt(0,chords.length)][3]
                            display_played.style.backgroundColor = "#afff9c"
                        } else{
                            display_played.style.backgroundColor = "#ff9c9c"
                        }
                    }
                }
            }
        }
    }


    
}
