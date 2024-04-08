//Function to be used for header in index.ejs.
const typewriter = function(str, delay) {
    let incrementDelay = delay;

    for (const char of str) {
        setTimeout(() => {
            document.getElementById('typewriter-output').innerHTML += char;
        }, delay);
        delay += incrementDelay;
    }
};


