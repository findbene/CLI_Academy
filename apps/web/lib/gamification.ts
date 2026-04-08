/**
 * Gamification Core Engine (ZTM Style)
 * Handles logic for generating shareable certificates, tracking daily streaks,
 * and parsing linkedin sharing URLs.
 */

// Generates the massive virality loop: 1-click sharing of architecture diagrams to LinkedIn.
export function generateLinkedInShareUrl(projectName: string, achievementLevel: string, userBypassUrl?: string): string {
    const baseUrl = "https://www.linkedin.com/feed/share/";
    
    const shareText = `I just hit ${achievementLevel} Clearance at the CLI Academy and mastered Autonomous Agents! 🤖🚀\n\n` +
                      `I built an end-to-end "${projectName}" using the Claw-Verse architecture with zero previous coding experience.\n\n` +
                      `Check out the real-time #AgenticAI curriculum here: https://cliacademy.dev/labs`;
    
    // In production, this would append a dynamically generated architecture diagram image URL that we host.
    const encodedUrl = encodeURIComponent(userBypassUrl || "https://cliacademy.dev");
    const encodedText = encodeURIComponent(shareText);
    
    return `${baseUrl}?url=${encodedUrl}&text=${encodedText}`;
}

// Simple local storage streak tracker for the Duolingo/DataCamp gamified mechanic.
export function incrementDailyStreak(): number {
    if (typeof window === 'undefined') return 0;
    
    const today = new Date().toDateString();
    const lastActive = localStorage.getItem('cli_last_active_date');
    let currentStreak = parseInt(localStorage.getItem('cli_streak_count') || '0', 10);

    if (lastActive === today) {
        // Already incremented today
        return currentStreak;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastActive === yesterday.toDateString()) {
        // Continuous streak
        currentStreak += 1;
    } else {
        // Streak broken, reset to 1
        currentStreak = 1;
    }

    localStorage.setItem('cli_last_active_date', today);
    localStorage.setItem('cli_streak_count', currentStreak.toString());
    
    return currentStreak;
}

// Checks if the user qualifies for the 'Agentic Alumni' unlock.
export function checkAlumniStatus(completedCapstones: number): boolean {
    const requiredCapstones = 3;
    return completedCapstones >= requiredCapstones;
}
