// Animation variants for cards
export const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      staggerChildren: 0.1
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: { 
      duration: 0.3, 
      ease: "easeOut",
      boxShadow: "0 20px 40px rgba(191, 91, 24, 0.15)"
    }
  }
};

// Animation variants for hero section
export const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      duration: 1, 
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const heroTextVariants = {
  hidden: { 
    opacity: 0, 
    x: -50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: "easeOut"
    }
  }
};

export const heroImageVariants = {
  hidden: { 
    opacity: 0, 
    x: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      delay: 0.3
    }
  }
};

export const buttonVariants = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      delay: 0.5
    }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export const badgeVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    rotate: -10
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut",
      delay: 0.1
    }
  }
};

// Floating animation for background elements
export const floatAnimation = {
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Pulse animation for background
export const pulseAnimation = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Scroll indicator animation
export const scrollIndicatorVariants = {
  animate: {
    y: [0, 10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};