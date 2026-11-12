/**
 * Static Contact Form Controller
 * Validates visitor inputs and opens the visitor's email client
 * using a dynamically constructed mailto: HTML anchor element.
 */

(function () {
  'use strict';

  var RECIPIENT_EMAIL = 'abinashfab098@gmail.com';
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('contactForm');
    if (!form) return;

    var nameInput = document.getElementById('contactName');
    var emailInput = document.getElementById('contactEmail');
    var messageInput = document.getElementById('contactMessage');
    var charCount = document.getElementById('contactCharCount');

    // Create or locate status banner
    var statusBanner = document.getElementById('contactFormStatus');
    if (!statusBanner) {
      statusBanner = document.createElement('div');
      statusBanner.id = 'contactFormStatus';
      statusBanner.className = 'pcontact-status-banner';
      statusBanner.style.display = 'none';
      form.parentNode.insertBefore(statusBanner, form);
    }

    // Create or locate hidden dynamic mailto anchor element
    var mailtoAnchor = document.getElementById('contactMailtoAnchor');
    if (!mailtoAnchor) {
      mailtoAnchor = document.createElement('a');
      mailtoAnchor.id = 'contactMailtoAnchor';
      mailtoAnchor.style.display = 'none';
      mailtoAnchor.setAttribute('aria-hidden', 'true');
      mailtoAnchor.tabIndex = -1;
      form.appendChild(mailtoAnchor);
    }

    function updateCharCount() {
      if (!charCount || !messageInput) return;
      charCount.textContent = messageInput.value.length + '/500';
    }

    function clearStatus() {
      statusBanner.style.display = 'none';
      statusBanner.innerHTML = '';
      statusBanner.className = 'pcontact-status-banner';
    }

    function setStatus(type, messageText, fallbackHref) {
      statusBanner.className = 'pcontact-status-banner ' + type;
      statusBanner.style.display = 'flex';
      statusBanner.innerHTML = '';

      var iconSpan = document.createElement('span');
      iconSpan.style.fontSize = '18px';
      iconSpan.textContent = type === 'success' ? '\u2713' : '\u26A0';

      var contentSpan = document.createElement('span');
      contentSpan.textContent = messageText;

      if (fallbackHref) {
        contentSpan.appendChild(document.createTextNode(' '));
        var fallbackLink = document.createElement('a');
        fallbackLink.href = fallbackHref;
        fallbackLink.textContent = 'Open email client';
        fallbackLink.style.color = 'inherit';
        fallbackLink.style.textDecoration = 'underline';
        fallbackLink.style.fontWeight = '600';
        contentSpan.appendChild(fallbackLink);
        contentSpan.appendChild(document.createTextNode('.'));
      }

      statusBanner.appendChild(iconSpan);
      statusBanner.appendChild(contentSpan);
      statusBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function buildMailtoHref(name, email, rawMessage) {
      var normalizedMessage = rawMessage.trim().replace(/\r\n|\r|\n/g, '\r\n');
      var subject = 'Portfolio Inquiry from ' + name;
      var body = [
        'Name: ' + name,
        'Email: ' + email,
        '',
        'Message:',
        normalizedMessage
      ].join('\r\n');

      return (
        'mailto:' +
        RECIPIENT_EMAIL +
        '?subject=' +
        encodeURIComponent(subject) +
        '&body=' +
        encodeURIComponent(body)
      );
    }

    if (messageInput) {
      messageInput.addEventListener('input', updateCharCount);
      updateCharCount();
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearStatus();

      var name = nameInput ? nameInput.value.trim() : '';
      var email = emailInput ? emailInput.value.trim() : '';
      var rawMessage = messageInput ? messageInput.value : '';
      var trimmedMessage = rawMessage.trim();

      if (!name) {
        setStatus('error', 'Please enter your name.');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!email) {
        setStatus('error', 'Please enter your email address.');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!EMAIL_PATTERN.test(email)) {
        setStatus('error', 'Please enter a valid email address.');
        if (emailInput) emailInput.focus();
        return;
      }

      if (!trimmedMessage) {
        setStatus('error', 'Please enter your message.');
        if (messageInput) messageInput.focus();
        return;
      }

      var mailtoHref = buildMailtoHref(name, email, rawMessage);
      mailtoAnchor.setAttribute('href', mailtoHref);
      mailtoAnchor.click();

      setStatus(
        'success',
        'Opening your email app to send your message to ' + RECIPIENT_EMAIL + '. If it did not open automatically,',
        mailtoHref
      );
    });
  });
})();
