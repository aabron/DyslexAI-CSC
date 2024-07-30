
let isVoiceEnabledGlobal = false;
export const ResponsiveVoice = (isVoiceEnabled) => {
    // const [isTickingEnabled, setIsTickingEnabled] = useState(false); 
    // const [tickInterval, setTickInterval] = useState(null);
    isVoiceEnabledGlobal = isVoiceEnabled;

    const handleMouseMove = (event) => {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const elements = document.querySelectorAll('button, a, p, h2, h3');
        let minDistance = Infinity;
        let closestElement = null;

        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementX = (rect.left + rect.right) / 2;
            const elementY = (rect.top + rect.bottom) / 2;
            const distance = Math.sqrt(Math.pow(mouseX - elementX, 2) + Math.pow(mouseY - elementY, 2));

            if (distance < minDistance) {
                minDistance = distance;
                closestElement = element;
            }
        });

        console.log(isVoiceEnabledGlobal)
        if (minDistance < 50) {
            // clearInterval(tickInterval);
            if (isVoiceEnabledGlobal) {
                window.responsiveVoice.speak(closestElement.innerText || closestElement.alt);
            }
            else {
                window.responsiveVoice.speak("", { volume: 0 });
            }
        } else {
            // const frequency = Math.max(100, 1000 - minDistance * 2);
            // console.log(frequency) // Adjust frequency calculation as needed
            // clearInterval(tickInterval);
            // setTickInterval(setInterval(() => {
            //     window.responsiveVoice.speak("Tick");
            //     console.log('Tick');
            // }, frequency));
        }
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        // clearInterval(tickInterval);
    };

}

export const playWelcomeMessage = (isVoiceEnabled) => {
    const script = document.getElementById('responsiveVoiceScript');
    console.log(script)
    if (script) {
        if (isVoiceEnabled) {
            window.responsiveVoice.speak("Welcome to DyslexAI do you want to keep voice Announcing on?");
        }
        else {
            window.responsiveVoice.speak("", { volume: 0 });
        }
    }
}

export const loadResponsiveVoice = async (isVoiceEnabled) => {

    const script = document.createElement('script');
    script.src = 'https://code.responsivevoice.org/responsivevoice.js?key=ozjPPfab';
    script.id = 'responsiveVoiceScript';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
        console.log('ResponsiveVoice script loaded');
    };

};

export const removeResponsiveVoice = (isVoiceEnabled) => {
    const script = document.getElementsByTagName('script');
    console.log(script)

    if (script) {
        for (let i = 0; i < script.length; i++) {
            if (script[i].id === 'responsiveVoiceScript') {
                script[i].parentElement.removeChild(script[i]);
                console.log('ResponsiveVoice script removed');
            }
        }
    }
};