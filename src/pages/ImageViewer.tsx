type ImageViewerProps = {
    src: string;
    alt: string;
    caption?: string;
};

function ImageViewer({ src, alt, caption }: ImageViewerProps) {
    return (
        <div className="image-viewer">
            <div className="image-viewer-frame">
                <img className="image-viewer-img" src={src} alt={alt} />
            </div>
            {caption && <p className="image-viewer-caption">{caption}</p>}
        </div>
    );
}

export default ImageViewer;
