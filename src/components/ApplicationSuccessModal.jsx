import React, { useEffect, useState } from 'react';
import './applicationSuccessModal.css';

export default function ApplicationSuccessModal({ visible, message, onClose }) {

    const [progressBarValue, setProgressBarValue] = useState(0);

    useEffect(() => {
        if (!visible) {
            setProgressBarValue(0);
            return;
        }

        setProgressBarValue(0);

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setProgressBarValue(100);
            });
        });

        const closeTimeout = setTimeout(() => {
            onClose?.();
        }, 3000);

        return () => {
            clearTimeout(closeTimeout);
        };
    }, [visible, onClose]);


    if (!visible) return null;

    return (
        <div className="application-success-overlay" role="alert" aria-live="assertive">
            <div className="application-success-card">

                <div className="application-success-icon">
                    <i className="pi pi-check-circle" aria-hidden="true"></i>
                </div>
                <p className="application-success-message">Application submitted!</p>
                <div className="application-success-progress" >
                    <div className="application-success-progress-bar"
                        style={{
                            width: progressBarValue + '%'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
