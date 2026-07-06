document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell"); 
    let currentPlayer = "X"; 
    
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8], 
        [0,3,6], [1,4,7], [2,5,8], 
        [0,4,8], [2,4,6] 
    ];

    // Function to generate cute synth sound effects natively
    function playSound(type) {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'press') {
                // Short, cute pop/click sound
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
                osc.start();
                osc.stop(ctx.currentTime + 0.05);
            } else if (type === 'win') {
                // Happy little arcade chime
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
                osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
                osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
                osc.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.24); // C6
                gain.gain.setValueAtTime(0.2, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
                osc.start();
                osc.stop(ctx.currentTime + 0.4);
            } else if (type === 'draw') {
                // Soft falling tone
                osc.type = 'sine';
                osc.frequency.setValueAtTime(400, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(250, ctx.currentTime + 0.2);
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                osc.start();
                osc.stop(ctx.currentTime + 0.2);
            }
        } catch (e) {
            console.log("Audio not allowed yet: click the screen first.");
        }
    }

    // Function to show the cute doodle bunny pop-up
    function showBunnyAlert(message) {
        // Create modal overlay
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100vw";
        overlay.style.height = "100vh";
        overlay.style.backgroundColor = "rgba(255, 234, 243, 0.75)";
        overlay.style.display = "flex";
        overlay.style.justifyContent = "center";
        overlay.style.alignItems = "center";
        overlay.style.zIndex = "9999";
        overlay.style.backdropFilter = "blur(3px)";

        // Create the bunny alert box
        const alertBox = document.createElement("div");
        alertBox.style.background = "#fff";
        alertBox.style.border = "4px solid #ffc9dc";
        alertBox.style.borderRadius = "20px";
        alertBox.style.padding = "25px";
        alertBox.style.textAlign = "center";
        alertBox.style.boxShadow = "0 8px 20px rgba(214, 51, 132, 0.2)";
        alertBox.style.fontFamily = "Arial, sans-serif";
        alertBox.style.animation = "popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards";

        // CSS animation for popping up
        const style = document.createElement('style');
        style.innerHTML = `@keyframes popIn { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }`;
        document.head.appendChild(style);

        // Cute text art doodle bunny illustration
        alertBox.innerHTML = `
            <div style="font-family: monospace; white-space: pre; font-size: 16px; color: #d6336c; line-height: 1.2; margin-bottom: 15px;">
 (\\_/)
 ( •.•)
 / >💞
            </div>
            <h3 style="margin: 0 0 15px 0; color: #d63384; font-size: 22px;">${message}</h3>
            <button id="close-bunny" style="background: #ffc9dc; border: 2px solid white; color: #d6336c; font-weight: bold; padding: 8px 20px; border-radius: 10px; cursor: pointer; box-shadow: 0 3px 6px rgba(0,0,0,0.1);">Play Again!</button>
        `;

        overlay.appendChild(alertBox);
        document.body.appendChild(overlay);

        // Click handler to dismiss and restart game
        document.getElementById("close-bunny").addEventListener("click", () => {
            playSound('press');
            document.body.removeChild(overlay);
            resetGame();
        });
    }

    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (cell.textContent !== "") return; 
            
            // Play keypress tone
            playSound('press');
            
            cell.textContent = currentPlayer; 
            
            // Add structural classes so text-shadow style rules hit perfectly
            if (currentPlayer === "X") {
                cell.classList.add("x");
            } else {
                cell.classList.add("o");
            }

            const result = checkWinner(); 

            if (result === "draw") {
                playSound('draw');
                showBunnyAlert("It's a draw! 🎀"); 
            } else if (result) {
                playSound('win');
                showBunnyAlert(`🎉 Player ${result} wins! 🎉`); 
            } else {
                currentPlayer = currentPlayer === "X" ? "💗" : "X"; 
            } 
        }); 
    }); 

    function checkWinner() {
        const values = Array.from(cells).map(c => c.textContent); 
        for (const [a,b,c] of winPatterns) {
            if (values[a] && values[a] === values[b] && values[a] === values[c]) {
                return values[a]; 
            } 
        } 
        if (values.every(v => v !== "")) return "draw"; 
        return null; 
    } 

    function resetGame() {
        cells.forEach(c => {
            c.textContent = ""; 
            c.className = "cell"; // Clears color helper classes
        });
        currentPlayer = "X"; 
    } 
});

