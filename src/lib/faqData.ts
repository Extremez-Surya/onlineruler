export interface FAQItem {
    question: string;
    answer: string;
    category: 'primary' | 'accuracy' | 'units' | 'devices' | 'calibration' | 'use-cases' | 'tools';
}

export const faqData: FAQItem[] = [
    // Primary FAQ
    {
        category: 'primary',
        question: "Can I use my phone as a ruler?",
        answer: "Yes, you can use your phone as a ruler by accessing onlineruler.com. Our mobile-optimized interface allows you to turn any smartphone into an accurate measuring tool. To ensure precision, simply calibrate your screen using a standard credit card or by entering your device's screen size. This transforms your phone into an <strong>actual size online ruler</strong> that you can take anywhere."
    },
    {
        category: 'primary',
        question: "Is there a ruler online?",
        answer: "Yes, there are several online rulers, but <strong>Real Online Ruler</strong> (onlineruler.com) is widely considered the most accurate. Our tool provides a digital scale in cm, mm, and inches that is calibrated to your specific display resolution. This ensures that the measurements you see on your screen match the physical world exactly, unlike static images of rulers found on search engines."
    },
    {
        category: 'primary',
        question: "How to identify 1 inch?",
        answer: "To identify 1 inch on your screen, use our <strong>online ruler inches</strong> tool. Once calibrated, the distance between the '0' mark and the '1' mark will be exactly one physical inch (25.4mm). You can verify this by placing a standard physical object, like a large paperclip or a quarter (which is nearly 1 inch wide), against the screen."
    },
    {
        category: 'primary',
        question: "How to measure cm online?",
        answer: "Measuring centimeters online is simple: 1. Visit onlineruler.com and select the 'CM' unit. 2. Calibrate your device using our wizard. 3. Place the object you want to measure against the digital scale. Our <strong>online ruler cm</strong> provides precise 0.1cm (1mm) markings for high-accuracy measurement."
    },
    {
        category: 'primary',
        question: "Can a smartphone measure?",
        answer: "A smartphone can measure objects quite accurately using its web browser and a calibrated <strong>digital ruler</strong>. By accounting for the device's specific Pixel Density (PPI), our tool ensures that a 10cm line on your screen is exactly 10cm in real life. It is the perfect tool for measuring small objects on the go."
    },
    {
        category: 'primary',
        question: "Can I use my camera as a ruler?",
        answer: "While some apps use augmented reality (AR) to measure via the camera, an <strong>online ruler camera</strong> alternative like our screen ruler is often more accurate for small, flat objects. By placing an object directly on the screen, you eliminate the parallax errors often associated with camera-based measurement apps."
    },
    {
        category: 'primary',
        question: "Can we measure online?",
        answer: "Absolutely. You can measure physical objects using an <strong>online ruler tool</strong>. This is done by displaying a physical-scale ruler on your monitor that has been adjusted to match your screen's resolution. It is a highly effective way to measure paper sizes, hardware, and small electronic components."
    },
    {
        category: 'primary',
        question: "How to read a ruler online?",
        answer: "Reading an <strong>accurate online ruler</strong> is just like reading a physical one. On the metric side, each long line represents 1 centimeter, with 10 small millimeter divisions in between. On the imperial side, the ruler is typically divided into inches, with sub-divisions for 1/2, 1/4, 1/8, and 1/16 of an inch."
    },
    {
        category: 'primary',
        question: "How to view ruler in Word Online?",
        answer: "To view the ruler in Microsoft Word Online, go to the 'View' tab in the top ribbon and check the box labeled 'Ruler'. If you find the built-in Word ruler difficult to use for physical objects, you can always keep onlineruler.com open in a side window for <strong>actual size measurement</strong>."
    },
    {
        category: 'primary',
        question: "How to add a ruler in Word Online?",
        answer: "You can't technically 'add' a custom ruler file to Word Online, but you can enable the built-in visual guides via the View menu. For real-world measurement tasks that Word can't handle, our <strong>free online ruler</strong> is the perfect companion tool."
    },
    {
        category: 'primary',
        question: "How to show ruler in PowerPoint Online?",
        answer: "In PowerPoint Online, you can show rulers by navigating to the 'View' tab and selecting the 'Ruler' checkbox. This helps with aligning elements on your slide, but for measuring physical objects intended for the slide, a <strong>calibrated online ruler</strong> is recommended."
    },
    {
        category: 'primary',
        question: "How to use online ruler?",
        answer: "To use our <strong>online ruler</strong>: 1. Calibrate your screen (using a credit card is fastest). 2. Choose your preferred units (cm, mm, inches, or pixels). 3. Place your object against the screen. 4. Use our floating guides or crosshairs for even more precision."
    },

    // Accuracy
    {
        category: 'accuracy',
        question: "How accurate is an online ruler?",
        answer: "An <strong>accurate online ruler</strong> is exactly as precise as a physical one, provided it is calibrated. Because monitors have different PPI (Pixels Per Inch) settings, a ruler that isn't calibrated will be off-scale. Once you match the digital scale to a physical reference like a credit card, the accuracy reaches sub-millimeter levels."
    },
    {
        category: 'accuracy',
        question: "Is this ruler actual size?",
        answer: "Yes, this is an <strong>actual size online ruler</strong>. By using our calibration tool, the software calculates the exact physical dimensions of your screen, ensuring that 1 inch on the screen is exactly 1 inch in the real world."
    },
    {
        category: 'accuracy',
        question: "Why does ruler calibration matter?",
        answer: "Ruler calibration is the most important step in digital measurement. Without it, a '12 inch ruler' might only be 10 inches wide on your screen. Calibration ensures the software knows your screen's DPI/PPI, resulting in a <strong>real online ruler</strong> experience."
    },

    // Units
    {
        category: 'units',
        question: "How many millimeters are in an inch?",
        answer: "There are exactly 25.4 millimeters in one inch. Our <strong>online ruler mm</strong> and <strong>online ruler inches</strong> tools use this international standard for all conversions and scaling."
    },
    {
        category: 'units',
        question: "How many centimeters are in an inch?",
        answer: "One inch is equal to 2.54 centimeters. When using our <strong>online ruler in cm</strong>, you can easily toggle to inches to see this conversion in real-time on your screen."
    },

    // Calibration
    {
        category: 'calibration',
        question: "What is credit card calibration?",
        answer: "Credit card calibration is the easiest way to get an <strong>accurate online ruler</strong>. Since all standard credit and debit cards are exactly 85.6mm x 53.98mm, they serve as a perfect physical reference to scale the digital ruler to your screen."
    },
    {
        category: 'calibration',
        question: "How does automatic device detection work?",
        answer: "Our <strong>online ruler tool</strong> queries a database of known device resolutions and screen sizes. If you are using a popular device like an iPhone 15 or a MacBook Pro, we can often set the correct PPI automatically for instant accuracy."
    },

    // Use Cases
    {
        category: 'use-cases',
        question: "Can designers use an online ruler?",
        answer: "Yes! Designers often use our <strong>pixel ruler</strong> mode to measure UI elements, and the <strong>actual size ruler</strong> mode to visualize how a logo or print asset will look in the real world at 1:1 scale."
    },
    {
        category: 'use-cases',
        question: "Can students use an online ruler?",
        answer: "Absolutely. Students find our <strong>free online ruler</strong> essential for geometry homework, measuring diagrams in digital textbooks, or completing craft projects when a physical ruler isn't available."
    }
];
