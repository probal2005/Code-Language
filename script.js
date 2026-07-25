// ================================
// DOM Elements
// ================================

const encodeInput = document.getElementById("encodeInput");
const decodeInput = document.getElementById("decodeInput");

const encodeBtn = document.getElementById("encodeBtn");
const decodeBtn = document.getElementById("decodeBtn");

const copyEncode = document.getElementById("copyEncode");
const copyDecode = document.getElementById("copyDecode");

const clearEncode = document.getElementById("clearEncode");
const clearDecode = document.getElementById("clearDecode");

const char1 = document.getElementById("char1");
const char2 = document.getElementById("char2");

const word1 = document.getElementById("word1");
const word2 = document.getElementById("word2");

const toast = document.getElementById("toast");

const settingBtn = document.getElementById("settingBtn");
const settingsWindow = document.getElementById("settingsWindow");
const closeSettings = document.getElementById("closeSettings");

const themeBtn = document.getElementById("themeBtn");

const shiftRange = document.getElementById("shiftRange");
const shiftNumber = document.getElementById("shiftNumber");

const pasteEncode = document.getElementById("pasteEncode");
const pasteDecode = document.getElementById("pasteDecode");

const downloadEncode = document.getElementById("downloadEncode");
const downloadDecode = document.getElementById("downloadDecode");

const uploadEncode = document.getElementById("uploadEncode");
const uploadDecode = document.getElementById("uploadDecode");

const fileEncode = document.getElementById("fileEncode");
const fileDecode = document.getElementById("fileDecode");


// ================================
// Variables
// ================================

let shift = Number(shiftRange.value);
let dark = true;


// ================================
// Toast Notification
// ================================

function showToast(message){

    toast.textContent = message;

    toast.style.opacity = "1";

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {

        toast.style.opacity = "0";

    },1800);

}


// ================================
// Word Counter
// ================================

function countWords(text){

    const value = text.trim();

    if(value==="") return 0;

    return value.split(/\s+/).length;

}


// ================================
// Character & Word Counter
// ================================

function updateCounters(){

    char1.textContent = encodeInput.value.length;

    char2.textContent = decodeInput.value.length;

    word1.textContent = countWords(encodeInput.value);

    word2.textContent = countWords(decodeInput.value);

}


// ================================
// Caesar Cipher
// ================================

function shiftText(text,amount){

    let result = "";

    for(const char of text){

        const code = char.charCodeAt(0);

        // Uppercase

        if(code>=65 && code<=90){

            result += String.fromCharCode(

                ((code-65+amount+26)%26)+65

            );

        }

        // Lowercase

        else if(code>=97 && code<=122){

            result += String.fromCharCode(

                ((code-97+amount+26)%26)+97

            );

        }

        // Other Characters

        else{

            result += char;

        }

    }

    return result;

}


// ================================
// Encode & Decode Functions
// ================================

function encode(text){

    return shiftText(text,-shift);

}

function decode(text){

    return shiftText(text,shift);

}


// ================================
// Clipboard Paste
// ================================

async function pasteTo(target){

    try{

        target.value = await navigator.clipboard.readText();

        updateCounters();

        showToast("Text Pasted Successfully");

    }

    catch{

        showToast("Clipboard Access Denied");

    }

}


// ================================
// Download Text File
// ================================

function download(filename,text){

    const blob = new Blob(

        [text],

        {

            type:"text/plain"

        }

    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = filename;

    link.click();

    URL.revokeObjectURL(link.href);

}

// ================================
// Encode Button
// ================================

encodeBtn.addEventListener("click", () => {

    decodeInput.value = encode(encodeInput.value);

    updateCounters();

    showToast("Text Encoded Successfully");

});


// ================================
// Decode Button
// ================================

decodeBtn.addEventListener("click", () => {

    encodeInput.value = decode(decodeInput.value);

    updateCounters();

    showToast("Text Decoded Successfully");

});


// ================================
// Copy Encode Text
// ================================

copyEncode.addEventListener("click", async () => {

    try{

        await navigator.clipboard.writeText(encodeInput.value);

        showToast("Copied Successfully");

    }

    catch{

        showToast("Copy Failed");

    }

});


// ================================
// Copy Decode Text
// ================================

copyDecode.addEventListener("click", async () => {

    try{

        await navigator.clipboard.writeText(decodeInput.value);

        showToast("Copied Successfully");

    }

    catch{

        showToast("Copy Failed");

    }

});


// ================================
// Clear Encode Text
// ================================

clearEncode.addEventListener("click", () => {

    encodeInput.value = "";

    updateCounters();

    showToast("Encode Box Cleared");

});


// ================================
// Clear Decode Text
// ================================

clearDecode.addEventListener("click", () => {

    decodeInput.value = "";

    updateCounters();

    showToast("Decode Box Cleared");

});


// ================================
// Live Character Counter
// ================================

encodeInput.addEventListener("input", () => {

    updateCounters();

});

decodeInput.addEventListener("input", () => {

    updateCounters();

});


// ================================
// Paste Buttons
// ================================

pasteEncode.addEventListener("click", () => {

    pasteTo(encodeInput);

});

pasteDecode.addEventListener("click", () => {

    pasteTo(decodeInput);

});


// ================================
// Download Buttons
// ================================

downloadEncode.addEventListener("click", () => {

    download(
        "encoded-input.txt",
        encodeInput.value
    );

});

downloadDecode.addEventListener("click", () => {

    download(
        "decoded-input.txt",
        decodeInput.value
    );

});

// ================================
// Upload Button Actions
// ================================

uploadEncode.addEventListener("click", () => {

    fileEncode.click();

});

uploadDecode.addEventListener("click", () => {

    fileDecode.click();

});


// ================================
// Upload Encode File
// ================================

fileEncode.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

        encodeInput.value = reader.result;

        updateCounters();

        showToast("File Loaded Successfully");

    };

    reader.readAsText(file);

});


// ================================
// Upload Decode File
// ================================

fileDecode.addEventListener("change", (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

        decodeInput.value = reader.result;

        updateCounters();

        showToast("File Loaded Successfully");

    };

    reader.readAsText(file);

});


// ================================
// Open Settings Window
// ================================

settingBtn.addEventListener("click", () => {

    settingsWindow.classList.add("show");

});


// ================================
// Close Settings Window
// ================================

closeSettings.addEventListener("click", () => {

    settingsWindow.classList.remove("show");

});


// ================================
// Close Settings When Clicking Outside
// ================================

window.addEventListener("click", (event) => {

    if (event.target === settingsWindow) {

        settingsWindow.classList.remove("show");

    }

});


// ================================
// Shift Slider
// ================================

shiftRange.addEventListener("input", () => {

    shift = Number(shiftRange.value);

    shiftNumber.textContent = shift;

});


// ================================
// Theme Toggle
// ================================

themeBtn.addEventListener("click", () => {

    dark = !dark;

    document.body.classList.toggle("light", !dark);

    if (dark) {

        themeBtn.textContent = "🌙 Dark";

    } else {

        themeBtn.textContent = "☀️ Light";

    }

    showToast(
        dark
            ? "Dark Mode Enabled"
            : "Light Mode Enabled"
    );

});


// ================================
// Keyboard Shortcuts
// ================================

document.addEventListener("keydown", (event) => {

    // Ctrl + Enter = Encode

    if (event.ctrlKey && event.key === "Enter") {

        event.preventDefault();

        encodeBtn.click();

    }

    // Ctrl + Shift + Enter = Decode

    if (
        event.ctrlKey &&
        event.shiftKey &&
        event.key === "Enter"
    ) {

        event.preventDefault();

        decodeBtn.click();

    }

});


// ================================
// Initialize
// ================================

updateCounters();

showToast("Welcome to Code Language Studio 🚀");