import { ReactElement, useState } from "react";
export function useMultiStepForm(steps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    function next()  {
        setCurrentIndex(prev => {
            if (prev >= steps.length - 1) {
                return prev;
            }
            return prev + 1
        })
    }
    function back() {
        setCurrentIndex(prev => {
            if (prev <= 0) {
                return prev;
            }
            return prev - 1;
        })
    }
    function goTo(index) {
        setCurrentIndex(index);
    }
    return {
        currentIndex,
        step: steps[currentIndex],
        steps,
        isFirstStep: currentIndex === 0,
        isLastStep: currentIndex === steps.length - 1,
        goTo,
        next,
        back
    }
}