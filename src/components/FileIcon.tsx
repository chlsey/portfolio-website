function FileIcon() {
    return (
        <svg
            className="file-icon"
            viewBox="0 0 32 36"
            width="84"
            height="94"
            aria-hidden="true"
        >
            <path
                d="M4 1h16l8 8v26H4z"
                fill="#fff"
                stroke="#0a3fa8"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <path
                d="M20 1v8h8"
                fill="none"
                stroke="#0a3fa8"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
            <rect x="8" y="16" width="16" height="1.8" fill="#0a3fa8" opacity="0.45" />
            <rect x="8" y="21" width="16" height="1.8" fill="#0a3fa8" opacity="0.45" />
            <rect x="8" y="26" width="11" height="1.8" fill="#0a3fa8" opacity="0.45" />
        </svg>
    );
}

export default FileIcon;
