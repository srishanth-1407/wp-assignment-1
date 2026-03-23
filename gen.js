const fs = require('fs');

const coursesInfo = [
    {
        id: 1, title: 'Full-Stack Web Development', link: 'course-details-1.html', price: '₹4,999', img: 'images/img1.jpg',
        instructor: 'Dr. Sarah Johnson', role: 'Senior Software Engineer & Educator',
        desc1: 'This comprehensive Full-Stack Web Development course is designed to take you from a complete beginner to a job-ready developer.',
        desc2: 'You will learn everything from building beautiful front-end interfaces with HTML, CSS, and JavaScript to creating powerful back-end servers with Node.js and Express.',
        mod1: 'HTML5 & Semantic Markup', mod2: 'CSS3 & Responsive Design', mod3: 'JavaScript ES6+', mod4: 'React.js Framework',
        dur: '18 Weeks', lec: '120 Lessons'
    },
    {
        id: 2, title: 'Data Science & Machine Learning', link: 'course-details-2.html', price: '₹5,499', img: 'images/img2.jpg',
        instructor: 'Prof. Michael Chen', role: 'Lead Data Scientist',
        desc1: 'Dive deep into the world of Data Science and Machine Learning. Learn how to extract insights from raw data.',
        desc2: 'We cover Python programming, statistical analysis, and machine learning models using libraries like Pandas, Scikit-Learn, and TensorFlow.',
        mod1: 'Python for Data Science', mod2: 'Data Visualization', mod3: 'Predictive Modeling', mod4: 'Deep Learning',
        dur: '20 Weeks', lec: '140 Lessons'
    },
    {
        id: 3, title: 'AWS Cloud Practitioner', link: 'course-details-3.html', price: '₹3,999', img: 'images/img3.jpg',
        instructor: 'Emily Rodriguez', role: 'AWS Certified Solutions Architect',
        desc1: 'Master cloud computing fundamentals and prepare for the AWS Certified Cloud Practitioner exam.',
        desc2: 'Understand core AWS services, security, architecture, pricing, and support to build reliable and scalable cloud solutions.',
        mod1: 'Cloud Concepts', mod2: 'AWS Core Services', mod3: 'Security & Compliance', mod4: 'Cloud Economics',
        dur: '8 Weeks', lec: '60 Lessons'
    },
    {
        id: 4, title: 'UI/UX Design Masterclass', link: 'course-details-4.html', price: '₹2,999', img: 'images/img4.jpg',
        instructor: 'Alex Hunter', role: 'UX Director & Product Designer',
        desc1: 'Learn the complete workflow of User Interface and User Experience design from wireframing to high-fidelity prototyping.',
        desc2: 'Master tools like Figma and understand user psychology, usability testing, and visual communication principles.',
        mod1: 'UX Fundamentals', mod2: 'Wireframing in Figma', mod3: 'Visual Design', mod4: 'Prototyping & Testing',
        dur: '12 Weeks', lec: '85 Lessons'
    },
    {
        id: 5, title: 'Mobile Development', link: 'course-details-5.html', price: '₹4,500', img: 'images/img5.jpg',
        instructor: 'Jessica Lee', role: 'Mobile Engineering Lead',
        desc1: 'Build cross-platform mobile apps for iOS and Android using React Native and Flutter frameworks.',
        desc2: 'From setup to deployment on the App Store and Google Play, learn to create responsive and native-feeling applications.',
        mod1: 'Mobile Navigation', mod2: 'State Management', mod3: 'Native APIs & Device Features', mod4: 'App Store Deployment',
        dur: '16 Weeks', lec: '110 Lessons'
    },
    {
        id: 6, title: 'Cybersecurity', link: 'course-details-6.html', price: '₹6,000', img: 'images/img6.jpg',
        instructor: 'Marcus Silva', role: 'Cybersecurity Consultant',
        desc1: 'A deep dive into ethical hacking, network security, and defense against modern cyber threats.',
        desc2: 'Learn vulnerability assessment, penetration testing, cryptography, and secure system design.',
        mod1: 'Network Security', mod2: 'Ethical Hacking', mod3: 'Cryptography', mod4: 'Incident Response',
        dur: '24 Weeks', lec: '160 Lessons'
    },
    {
        id: 7, title: 'Digital Marketing Complete Guide', link: 'course-details-7.html', price: '₹2,500', img: 'images/img7.jpg',
        instructor: 'David Kim', role: 'Chief Marketing Officer',
        desc1: 'Master SEO, Social Media Marketing, PPC, and Email Marketing in one comprehensive guide.',
        desc2: 'Drive traffic, increase engagement, and improve conversion rates using data-driven marketing strategies.',
        mod1: 'SEO Fundamentals', mod2: 'Social Media Strategy', mod3: 'Google Ads & PPC', mod4: 'Analytics & Reporting',
        dur: '10 Weeks', lec: '75 Lessons'
    },
    {
        id: 8, title: 'Python Programming', link: 'course-details-8.html', price: '₹3,000', img: 'images/img8.jpg',
        instructor: 'Anita Patel', role: 'Senior Software Engineer',
        desc1: 'Start your coding journey with Python. This beginner-friendly course covers all core programming concepts.',
        desc2: 'Build real-world projects, automate tasks, and learn object-oriented programming to become proficient in Python.',
        mod1: 'Python Basics', mod2: 'Data Structures', mod3: 'OOP Concepts', mod4: 'Automation Scripts',
        dur: '14 Weeks', lec: '90 Lessons'
    },
    {
        id: 9, title: 'Artificial Intelligence Fundamentals', link: 'course-details-9.html', price: '₹5,999', img: 'images/img9.jpg',
        instructor: 'Dr. John Doe', role: 'AI Researcher',
        desc1: 'Understand the foundations of Artificial Intelligence, neural networks, and generative models.',
        desc2: 'Explore practical implementations of AI in natural language processing and computer vision applications.',
        mod1: 'AI Principles', mod2: 'Neural Networks', mod3: 'NLP Basics', mod4: 'Generative Models',
        dur: '22 Weeks', lec: '150 Lessons'
    }
];

const template = fs.readFileSync('course-details.html', 'utf-8');

coursesInfo.forEach(course => {
    let modified = template;
    // Replace title
    modified = modified.replace(/<h1>Full-Stack Web Development<\/h1>/g, `<h1>${course.title}</h1>`);
    modified = modified.replace(/<title>Full-Stack Web Development - CourseLearn<\/title>/g, `<title>${course.title} - CourseLearn</title>`);
    modified = modified.replace(/<span class="sidebar-category">Full-Stack Web...<\/span>/g, `<span class="sidebar-category">${course.title.substring(0, 15)}...</span>`);
    modified = modified.replace(/<span class="sidebar-category">Web Development<\/span>/g, `<span class="sidebar-category">${course.title.substring(0, 15)}...</span>`);
    
    // Replace Instructor and Role
    modified = modified.replace(/<h3>Dr\. Sarah Johnson<\/h3>/g, `<h3>${course.instructor}</h3>`);
    modified = modified.replace(/<p class="instructor-title">Senior Software Engineer & Educator<\/p>/g, `<p class="instructor-title">${course.role}</p>`);
    
    // Replace Price
    modified = modified.replace(/<span class="current-price">&#8377;4,999<\/span>/g, `<span class="current-price">${course.price.replace('₹', '&#8377;')}</span>`);
    
    // Replace Descriptions
    modified = modified.replace(/This comprehensive Full-Stack Web Development course is designed to take you from a complete.*?(?=<\/p>)/s, course.desc1);
    modified = modified.replace(/Throughout the course, you'll work on real-world projects that will form the foundation.*?(?=<\/p>)/s, course.desc2);

    // Replace Modules
    modified = modified.replace(/<h4>HTML5 & Semantic Markup<\/h4>/g, `<h4>${course.mod1}</h4>`);
    modified = modified.replace(/<h4>CSS3 & Responsive Design<\/h4>/g, `<h4>${course.mod2}</h4>`);
    modified = modified.replace(/<h4>JavaScript ES6\+<\/h4>/g, `<h4>${course.mod3}</h4>`);
    modified = modified.replace(/<h4>React.js Framework<\/h4>/g, `<h4>${course.mod4}</h4>`);

    // Replace Sidebar Stats
    modified = modified.replace(/<strong>18 Weeks<\/strong>/g, `<strong>${course.dur}</strong>`);
    modified = modified.replace(/<strong>120 Lessons<\/strong>/g, `<strong>${course.lec}</strong>`);
    
    // Replace Sidebar Cover Image
    modified = modified.replace(/url\('images\/img1\.jpg'\)/g, `url('${course.img}')`); // if template has image
    // If template has generic placeholder bg instead:
    modified = modified.replace(/class="sidebar-image" style="background: #ffffff; border-bottom: 1px solid #333; color: #000;"/g, `class="sidebar-image" style="background: url('${course.img}') center/cover; border-bottom: 1px solid #333; color: transparent;"`);

    fs.writeFileSync(course.link, modified);
});

// Re-update courses.html so it points to the correct details pages
let coursesHtml = fs.readFileSync('courses.html', 'utf-8');
const oldLink = 'href="course-details.html" class="btn btn-small"';
for(let i=0; i<coursesInfo.length; i++) {
    coursesHtml = coursesHtml.replace(oldLink, `href="${coursesInfo[i].link}" class="btn btn-small"`);
}
fs.writeFileSync('courses.html', coursesHtml);

console.log("Details pages with unique descriptions generated successfully.");
