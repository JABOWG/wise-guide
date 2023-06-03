import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="container has-text-centered">
        <h1 className="title">Wise Guide</h1>
        <p className="subtitle">
          Your AI Tutor for Homework and Assignments
        </p>
      </div>

      <section className="section">
        <div className="container">
          <div className="content has-text-centered">
            <h2 className="title">How Can Wise Guide Help?</h2>
            <p className="subtitle">
              Wise Guide is an AI-powered tutor that is designed to assist
              students with any difficulties they have with homework and
              assignments. Whether it's math, science, history, or any other
              subject, Wise Guide is here to help you improve your knowledge and
              grades.
            </p>
            <p className="subtitle">
              Our advanced AI algorithms analyze your questions and provide
              detailed explanations, step-by-step solutions, and additional
              resources to help you understand the concepts better. With Wise
              Guide, you'll never feel stuck or overwhelmed by your assignments
              again.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="content">
            <h2 className="title has-text-centered">Key Features</h2>
            <ul>
              <li>
                <i className="fas fa-check-circle"></i>
                Personalized Assistance: Wise Guide tailors its responses to your
                specific questions and learning needs.
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                Step-by-Step Solutions: Get detailed step-by-step solutions to
                complex problems.
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                Rich Resource Library: Access a wide range of resources,
                including videos, articles, and practice exercises.
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                Interactive Learning: Engage in interactive learning experiences
                that make studying enjoyable.
              </li>
              <li>
                <i className="fas fa-check-circle"></i>
                Progress Tracking: Monitor your progress and track your
                improvements over time.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container has-text-centered">
          <h2 className="title">Ready to Get Started?</h2>
          <p className="subtitle">
            Join thousands of students who are already using Wise Guide to excel
            in their studies. Sign up today and experience the benefits of
            having a personal AI tutor by your side.
          </p>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
