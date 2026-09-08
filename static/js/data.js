/*
  Demo data only.

  When the backend is ready, replace this file's contents by calling
  MailSense.setEmails(list) from your own script, or push single updates
  with MailSense.addEmail(mail) as new messages arrive. See app.js for
  the shape each mail object should have.
*/

const DEMO_EMAILS = [
  {
    id: 'm1',
    sender: 'Google Developers Group',
    subject: 'This is the mail subject',
    preview: 'This is the mail subject line preview text that gives a short summary of the message content before it is opened.',
    body: 'This is a demo message body. When the backend sends real mail content, it will render here in full, including any greeting, paragraphs and sign off from the original message.',
    time: '9:30AM',
    day: 'Today',
    priority: 'high',
    read: false
  },
  {
    id: 'm2',
    sender: 'Google Developers Group',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Today',
    priority: 'high',
    read: false
  },
  {
    id: 'm3',
    sender: 'International Hospital Kano',
    subject: 'Appointment with Doctor Femi on Thursday',
    preview: 'This confirms your appointment with Doctor Femi on Thursday at 11am. Please arrive fifteen minutes early.',
    body: 'This confirms your appointment with Doctor Femi on Thursday at 11am. Please arrive fifteen minutes early to complete your check in. Bring your patient card and any recent test results.',
    time: '9:03AM',
    day: 'Today',
    priority: 'high',
    read: false
  },
  {
    id: 'm4',
    sender: 'Google Developers Group',
    subject: 'The subject maximum length before dots start showing',
    preview: 'This subject line is intentionally long, so the interface can show how truncation behaves once the text runs out of room.',
    body: 'This subject line is intentionally long, so the interface can show how truncation behaves once the text runs out of room in the list view. The full subject is always shown once the message is opened.',
    time: '9:30AM',
    day: 'Today',
    priority: 'high',
    read: true
  },
  {
    id: 'm5',
    sender: 'This is the sender name',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Yesterday',
    priority: 'high',
    read: true
  },
  {
    id: 'm6',
    sender: 'Maximum length of sender is shown here',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Yesterday',
    priority: 'medium',
    read: true
  },
  {
    id: 'm7',
    sender: 'Google Developers Group',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Yesterday',
    priority: 'high',
    read: true
  },
  {
    id: 'm8',
    sender: 'Google Developers Group',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Yesterday',
    priority: 'high',
    read: true
  }
  ,
  {
    id: 'm9',
    sender: 'Google Developers Group',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Yesterday',
    priority: 'high',
    read: true
  }
  ,
  {
    id: 'm10',
    sender: 'Google Developers Group',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Yesterday',
    priority: 'high',
    read: true
  }
  ,
  {
    id: 'm11',
    sender: 'Google Developers Group',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Yesterday',
    priority: 'high',
    read: true
  }
  ,
  {
    id: 'm12',
    sender: 'Google Developers Group',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Yesterday',
    priority: 'high',
    read: true
  }
  ,
  {
    id: 'm13',
    sender: 'Google Developers Group',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Yesterday',
    priority: 'high',
    read: true
  }
  ,
  {
    id: 'm14',
    sender: 'Google Developers Group',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Yesterday',
    priority: 'high',
    read: true
  }
  ,
  {
    id: 'm15',
    sender: 'Google Developers Group',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Yesterday',
    priority: 'high',
    read: true
  }
  ,
  {
    id: 'm16',
    sender: 'Google Developers Group',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Yesterday',
    priority: 'high',
    read: true
  }
  ,
  {
    id: 'm17',
    sender: 'Google Developers Group',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Yesterday',
    priority: 'high',
    read: true
  }
  ,
  {
    id: 'm18',
    sender: 'Google Developers Group',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Yesterday',
    priority: 'high',
    read: true
  }
  ,
  {
    id: 'm19',
    sender: 'Google Developers Group',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Yesterday',
    priority: 'high',
    read: true
  }
  ,
  {
    id: 'm20',
    sender: 'Google Developers Group',
    subject: 'Hackathon Registration Starts',
    preview: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four can sign up through the portal.',
    body: 'Registration for the upcoming hackathon opens today at noon. Teams of up to four members can sign up through the portal linked below. Spots are limited, so early registration is encouraged.',
    time: '9:30AM',
    day: 'Yesterday',
    priority: 'high',
    read: true
  }
];
