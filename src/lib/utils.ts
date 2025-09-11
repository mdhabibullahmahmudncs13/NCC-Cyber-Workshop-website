export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: string | Date | null | undefined) {
  if (!date) return 'N/A';
  
  const dateObj = new Date(date);
  
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(dateObj);
}

export function formatDateTime(date: string | Date | null | undefined) {
  if (!date) return 'N/A';
  
  const dateObj = new Date(date);
  
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(dateObj);
}

export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string) {
  const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;
  return phoneRegex.test(phone);
}

export function validateStudentId(studentId: string) {
  // Basic validation for student ID format
  const idRegex = /^[A-Z]{2,}-\d{4,}$/;
  return idRegex.test(studentId);
}

export function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function copyToClipboard(text: string) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
    document.body.removeChild(textArea);
    return Promise.resolve();
  }
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'verified':
    case 'approved':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'rejected':
    case 'declined':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

export function isRegistrationOpen() {
  const now = new Date();
  const startDate = new Date('2025-09-06');
  const endDate = new Date('2025-09-12'); // Extended to Sep 12 for Sep 13 workshop
  endDate.setHours(23, 59, 59, 999); // End of day
  
  return now >= startDate && now <= endDate;
}

export function getTimeUntilRegistrationEnd() {
  const now = new Date();
  const endDate = new Date('2025-09-12'); // Updated to match new registration end date
  endDate.setHours(23, 59, 59, 999);
  
  const diff = endDate.getTime() - now.getTime();
  
  if (diff <= 0) return null;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes };
}

export function generateReferenceCode(studentId: string) {
  return `NCC-${studentId}`;
}

export function validateFile(file: File, allowedTypes: string[], maxSize: number) {
  const errors = [];
  
  if (allowedTypes.indexOf(file.type) === -1) {
    errors.push(`File type ${file.type} is not allowed`);
  }
  
  if (file.size > maxSize) {
    errors.push(`File size ${formatFileSize(file.size)} exceeds limit of ${formatFileSize(maxSize)}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

export const workshopSchedule = [
  {
    time: '9:00 AM - 10:30 AM',
    title: 'Operating System Fundamentals',
    description: 'Understanding OS vulnerabilities and exploitation techniques',
    instructor: 'Security Expert'
  },
  {
    time: '10:30 AM - 11:30 AM',
    title: 'Google Dorking/Google Hacking',
    description: 'Advanced search techniques for information gathering',
    instructor: 'OSINT Specialist'
  },
  {
    time: '11:30 AM - 1:00 PM',
    title: 'Phishing Attack Techniques',
    description: 'Social engineering and phishing attack vectors',
    instructor: 'Cybersecurity Researcher'
  },
  {
    time: '1:00 PM - 1:30 PM',
    title: 'Lunch Break',
    description: 'Networking and refreshments',
    instructor: ''
  },
  {
    time: '1:30 PM - 2:30 PM',
    title: 'WiFi Hacking, Bugging, Jamming',
    description: 'Wireless network security testing and attacks',
    instructor: 'Network Security Expert'
  },
  {
    time: '2:30 PM - 3:00 PM',
    title: 'Cracking ZIP Files',
    description: 'Password cracking techniques and tools',
    instructor: 'Penetration Tester'
  },
  {
    time: '3:00 PM - 4:00 PM',
    title: 'Memory Recovery & Forensics',
    description: 'Digital forensics and data recovery techniques',
    instructor: 'Digital Forensics Expert'
  }
];

export const faqData = [
  {
    question: 'Who can participate in this workshop?',
    answer: 'This workshop is open to all university students interested in cybersecurity. Basic computer knowledge is recommended but not required.'
  },
  {
    question: 'What is the registration fee?',
    answer: 'The registration fee is 100 TK, which includes workshop materials, lunch, and a certificate of participation.'
  },
  {
    question: 'How do I make the payment?',
    answer: 'Payment can be made through bKash or Nagad to 01784275877. Use the reference format NCC-[YOUR_USER_ID] and submit the transaction details through the payment form.'
  },
  {
    question: 'What should I bring to the workshop?',
    answer: 'Please bring your laptop with a working WiFi connection. We will provide additional tools and materials as needed.'
  },
  {
    question: 'Will I receive a certificate?',
    answer: 'Yes, all participants who complete the workshop will receive a certificate of participation from NCC.'
  },
  {
    question: 'Is there any prerequisite knowledge required?',
    answer: 'Basic understanding of computers and networking is helpful, but we will cover fundamentals as needed.'
  },
  {
    question: 'What if I miss the registration deadline?',
    answer: 'Registration closes on September 10, 2025. Late registrations will not be accepted due to limited capacity.'
  },
  {
    question: 'Can I get a refund if I cannot attend?',
    answer: 'Refunds are available up to 24 hours before the workshop date. Please contact support for refund requests.'
  }
];
