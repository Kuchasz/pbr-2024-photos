// src/components/ForkMeOnGithub.tsx
import React from 'react';

interface ForkMeOnGithubProps {
    repoUrl: string; // GitHub repository URL
    label?: string;  // Optional button text
    className?: string; // Optional custom CSS class
}

const ForkMeOnGithub: React.FC<ForkMeOnGithubProps> = ({ repoUrl, label = "Fork me on GitHub", className }) => {
    return (
        <a href={repoUrl} className={className} target="_blank" rel="noopener noreferrer">
            <button style={styles.button}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.09.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.37-1.342-3.37-1.342-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.34-2.22-.252-4.555-1.11-4.555-4.943 0-1.092.39-1.985 1.029-2.683-.103-.253-.446-1.271.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.803c.85.004 1.705.115 2.503.337 1.907-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.397.1 2.65.64.698 1.028 1.591 1.028 2.683 0 3.841-2.339 4.688-4.566 4.936.36.309.679.92.679 1.852 0 1.337-.012 2.417-.012 2.747 0 .268.18.577.688.479A10.011 10.011 0 0022 12c0-5.523-4.477-10-10-10z" />
                </svg>
                {label}
            </button>
        </a>
    );
};

const styles = {
    button: {
        display: 'flex',
        alignItems: 'center',
        color: '#24292e',
        backgroundColor: '#ffffff',
        border: 'none',
        padding: '10px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
        lineHeight: '1.5',
    },
};

export default ForkMeOnGithub;
