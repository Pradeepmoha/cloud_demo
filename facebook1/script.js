// Facebook Login Script
window.fbAsyncInit = function() {
    FB.init({
      appId      : '3847924582132883',
      cookie     : true,
      xfbml      : true,
      version    : 'v21.0'
    });

    FB.AppEvents.logPageView();
  };

  const loginPage = document.getElementById('login-page');
  const mainPage = document.getElementById('main-page');
  const postC=document.getElementById("post-c");
  const logoutBtn = document.getElementById('logout-btn');
  const fbLoginBtn = document.getElementById('fb-login-btn');
  const profileName = document.getElementById('profile-name');
  const profilePicture = document.getElementById('profile-picture');
  const viewPostsBtn = document.getElementById('view-posts-btn');
  const expertSystemBtn = document.getElementById('expert-system-btn');
  const postPage = document.getElementById('posts-page-kk');
  const expertSystem = document.getElementById('expert-system');
  const chatbot = document.getElementById('chatbot');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSendBtn = document.getElementById('chatbot-send');
  const fbPosts = document.querySelectorAll('.fb-post');
  const prevPostBtn = document.getElementById('prev-post-btn');
  const nextPostBtn = document.getElementById('next-post-btn');

  let currentPostIndex = 0;

  // Function to show the current post based on index
  function showPost(index) {
    fbPosts.forEach((post, i) => {
      post.style.display = (i === index) ? 'block' : 'none';
    });
  }

  // Event listeners for navigation buttons
  prevPostBtn.addEventListener('click', () => {
    currentPostIndex = (currentPostIndex === 0) ? fbPosts.length - 1 : currentPostIndex - 1;
    showPost(currentPostIndex);
  });

  nextPostBtn.addEventListener('click', () => {
    currentPostIndex = (currentPostIndex === fbPosts.length - 1) ? 0 : currentPostIndex + 1;
    showPost(currentPostIndex);
  });

  // Initialize the first post
  showPost(currentPostIndex);

  fbLoginBtn.addEventListener('click', () => {
    FB.login(function(response) {
      if (response.authResponse) {
        FB.api('/me', function(response) {
          profileName.innerHTML = 'Welcome, ' + response.name;
          profilePicture.src = 'https://graph.facebook.com/' + response.id + '/picture?type=large';
          loginPage.style.display = 'none';
          mainPage.style.display = 'block';
         
          
        });
      }
    });
  });

  logoutBtn.addEventListener('click', () => {
    FB.logout(() => {
      loginPage.style.display = 'block';
      mainPage.style.display = 'none';
      postPage.style.display = 'none';
      expertSystem.style.display = 'none';
    });
  });

  viewPostsBtn.addEventListener('click', () => {
    postPage.style.display = 'block';
    mainPage.style.display = 'none';
    expertSystem.style.display = 'none';
    chatbot.style.display = 'none'; 
       
    FB.XFBML.parse();
  });

  expertSystemBtn.addEventListener('click', () => {

mainPage.style.display = 'none';
postPage.style.display = 'none';
expertSystem.style.display = 'none'; // Ensure the expert system section is hidden
});


  function closePosts() {
    postPage.style.display = 'none';
    mainPage.style.display = 'block';
  }

  chatbotSendBtn.addEventListener('click', () => {
    const userMessage = chatbotInput.value;
    if (userMessage) {
      const userMsg = document.createElement('p');
      userMsg.innerHTML = '<strong>You:</strong> ' + userMessage;
      chatbotMessages.appendChild(userMsg);
      chatbotInput.value = '';

      const botReply = document.createElement('p');
      botReply.innerHTML = '<strong>Expert:</strong> This is an automated response.';
      chatbotMessages.appendChild(botReply);

      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
  });

  // Toggle Expert System Display
expertSystemBtn.addEventListener('click', () => {
expertSystem.style.display = 'block';

mainPage.style.display = 'none';
postPage.style.display = 'none';
});

// Function to close Expert System
function closeExpertSystem() {
expertSystem.style.display = 'none';
mainPage.style.display = 'block';
}

// Chatbot Interaction
chatbotSendBtn.addEventListener('click', () => {
const userMessage = chatbotInput.value.trim();
if (userMessage) {
  const userMsg = document.createElement('p');
  userMsg.innerHTML = '<strong>You:</strong> ' + userMessage;
  chatbotMessages.appendChild(userMsg);

  chatbotInput.value = '';

  // Simulated bot reply
  const botReply = document.createElement('p');
  botReply.innerHTML = '<strong>Expert:</strong> This is an automated response. Ask me another question.';
  chatbotMessages.appendChild(botReply);

  // Scroll to the latest message
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}
});
// Function to send predefined messages
function sendPredefinedMessage(message) {
const userMsg = document.createElement('p');
userMsg.innerHTML = '<strong>You:</strong> ' + message;
chatbotMessages.appendChild(userMsg);

// Simulated bot reply
const botReply = document.createElement('p');
botReply.innerHTML = "<strong>Expert:</strong> Here\"s a response to your query: \"" + message + "\";";


chatbotMessages.appendChild(botReply);

chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Event listener for the Send button
chatbotSendBtn.addEventListener('click', () => {
const userMessage = chatbotInput.value.trim();
if (userMessage) {
  sendPredefinedMessage(userMessage);
  chatbotInput.value = ''; // Clear the input field
}
});