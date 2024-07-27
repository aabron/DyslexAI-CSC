
export const ResponsiveVoice = () => {
    // const [isTickingEnabled, setIsTickingEnabled] = useState(false); 
    // const [tickInterval, setTickInterval] = useState(null);

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

        if (minDistance < 50) { 
            // clearInterval(tickInterval);
            window.responsiveVoice.speak(closestElement.innerText || closestElement.alt);
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

export const playWelcomeMessage = () => {
    window.responsiveVoice.speak("Welcome to DyslexAI do you want to keep voice Announcing on?");
}