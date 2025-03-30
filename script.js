document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector(".mobile-menu-toggle");
    const nav = document.querySelector("nav");
    const authButtons = document.querySelector(".auth-buttons");
    
    if (menuToggle) {
        menuToggle.addEventListener("click", function() {
            nav.style.display = nav.style.display === "block" ? "none" : "block";
            authButtons.style.display = authButtons.style.display === "flex" ? "none" : "flex";
        });
    }
    
    // Testimonial slider
    const testimonials = document.querySelector(".testimonials-slider");
    const prevButton = document.querySelector(".slider-prev");
    const nextButton = document.querySelector(".slider-next");
    
    if (testimonials && prevButton && nextButton) {
        let currentSlide = 0;
        const testimonialCards = document.querySelectorAll(".testimonial-card");
        
        if (testimonialCards.length > 0) {
            prevButton.addEventListener("click", function() {
                currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
                updateSlider();
            });
            
            nextButton.addEventListener("click", function() {
                currentSlide = (currentSlide + 1) % testimonialCards.length;
                updateSlider();
            });
            
            function updateSlider() {
                testimonialCards.forEach((card, index) => {
                    if (index === currentSlide) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });
            }
            
            // Initialize slider
            updateSlider();
        }
    }
    
    // Modal functionality
    const modal = document.getElementById("eligibilityResultModal");
    const closeModal = document.querySelector(".close-modal");
    
    if (modal && closeModal) {
        closeModal.addEventListener("click", function() {
            modal.style.display = "none";
        });
        
        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
    
    // Form submission
    const eligibilityForm = document.getElementById("eligibilityForm");
    
    if (eligibilityForm) {
        eligibilityForm.addEventListener("submit", function(event) {
            event.preventDefault();
            
            // Get form values
            const provider = document.getElementById("insuranceProvider").value;
            const subscriberId = document.getElementById("subscriberId").value;
            const groupNumber = document.getElementById("groupNumber").value;
            const patientDOB = document.getElementById("patientDOB").value;
            const serviceDate = document.getElementById("serviceDate").value;
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll simulate a response
            simulateEligibilityCheck(provider, subscriberId, patientDOB);
        });
    }
    
    // Simulate eligibility check (for demo purposes only)
    function simulateEligibilityCheck(provider, subscriberId, patientDOB) {
        // Simulate loading
        const resultsContainer = document.getElementById("eligibilityResults");
        resultsContainer.innerHTML = '<div class="loading-spinner">Loading results...</div>';
        
        // Display the modal
        modal.style.display = "block";
        
        // Simulate server delay
        setTimeout(function() {
            // Generate a random result for demo purposes
            const isEligible = Math.random() > 0.2; // 80% chance of being eligible
            
            let providerName = provider === "delta" ? "Delta Dental NJ" : "Cigna Dental";
            
            // Create results HTML
            let resultsHTML = `
                <div class="eligibility-result">
                    <div class="eligibility-status ${isEligible ? 'status-active' : 'status-inactive'}">
                        ${isEligible ? 'Active' : 'Inactive'}
                    </div>
                    <h3>Patient Coverage Information</h3>
                    <div class="eligibility-details">
                        <div class="details-group">
                            <h4>Insurance Provider</h4>
                            <p>${providerName}</p>
                        </div>
                        <div class="details-group">
                            <h4>Subscriber ID</h4>
                            <p>${subscriberId}</p>
                        </div>
                        <div class="details-group">
                            <h4>Coverage Type</h4>
                            <p>${isEligible ? 'Dental PPO' : 'N/A'}</p>
                        </div>
                        <div class="details-group">
                            <h4>Effective Date</h4>
                            <p>${isEligible ? 'January 1, 2025' : 'N/A'}</p>
                        </div>
            `;
            
            if (isEligible) {
                // Create random benefits data for demo
                const annualMax = Math.floor(Math.random() * 1000 + 1000) * 100; // Random between $1000-$2000
                const deductible = Math.floor(Math.random() * 5 + 1) * 50; // Random between $50-$250
                const preventivePercent = 100;
                const basicPercent = Math.floor(Math.random() * 3 + 7) * 10; // Random between 70-90%
                const majorPercent = Math.floor(Math.random() * 3 + 5) * 10; // Random between 50-70%
                const orthodontiaPercent = Math.random() > 0.5 ? Math.floor(Math.random() * 2 + 4) * 10 : 0; // 50% chance of ortho
                
                resultsHTML += `
                        <div class="details-group">
                            <h4>Annual Maximum</h4>
                            <p>$${annualMax.toLocaleString()}</p>
                        </div>
                        <div class="details-group">
                            <h4>Remaining Benefit</h4>
                            <p>$${(annualMax - Math.floor(Math.random() * annualMax * 0.4)).toLocaleString()}</p>
                        </div>
                        <div class="details-group">
                            <h4>Deductible</h4>
                            <p>$${deductible.toLocaleString()}</p>
                        </div>
                        <div class="details-group">
                            <h4>Deductible Met</h4>
                            <p>${Math.random() > 0.6 ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                    
                    <h3 class="mt-4">Benefits Breakdown</h3>
                    <table class="benefits-table">
                        <thead>
                            <tr>
                                <th>Service Category</th>
                                <th>Coverage Percentage</th>
                                <th>Waiting Period</th>
                                <th>Frequency Limitation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Preventive & Diagnostic</td>
                                <td>${preventivePercent}%</td>
                                <td>None</td>
                                <td>Twice per benefit period</td>
                            </tr>
                            <tr>
                                <td>Basic Restorative</td>
                                <td>${basicPercent}%</td>
                                <td>None</td>
                                <td>None</td>
                            </tr>
                            <tr>
                                <td>Major Restorative</td>
                                <td>${majorPercent}%</td>
                                <td>${Math.random() > 0.5 ? 'None' : '6 months'}</td>
                                <td>Once every 5 years per tooth</td>
                            </tr>
                            <tr>
                                <td>Orthodontia</td>
                                <td>${orthodontiaPercent}%</td>
                                <td>${orthodontiaPercent > 0 ? '12 months' : 'Not covered'}</td>
                                <td>${orthodontiaPercent > 0 ? 'Lifetime maximum: $1,500' : 'Not covered'}</td>
                            </tr>
                        </tbody>
                    </table>
                `;
            } else {
                resultsHTML += `
                    </div>
                    <p class="alert-message">This patient is not currently eligible for benefits. Please verify the information or contact the insurance provider directly.</p>
                `;
            }
            
            resultsHTML += `</div>`;
            
            // Update the modal content
            resultsContainer.innerHTML = resultsHTML;
            
        }, 1500); // Simulate 1.5 second delay
    }
    
    // Automatically switch between plans on hover for better UX
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    if (pricingCards.length > 0) {
        pricingCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                // Remove featured class from all cards
                pricingCards.forEach(c => c.classList.remove('featured'));
                // Add featured class to current card
                this.classList.add('featured');
            });
        });
    }
});