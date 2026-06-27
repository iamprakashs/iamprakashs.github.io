import { useEffect, useMemo, useState } from 'react'
import './App.css'

const profile = {
  name: 'Prakash Samanta',
  role: 'Lead AI/ML',
  location: 'India',
  email: 'hello@example.com',
  githubUsername: 'iamprakashs',
  tagline: 'I lead AI/ML systems from idea to production.',
  intro:
    'A personal portfolio for AI/ML leadership, applied research, product thinking, and engineering work that moves from prototype to production.',
  availability: 'Open to AI/ML leadership, research, and product collaborations',
}

const socials = [
  { label: 'GitHub', href: `https://github.com/${profile.githubUsername || ''}` },
  { label: 'LinkedIn', href: 'https://linkedin.com/' },
  { label: 'Email', href: `mailto:${profile.email}` },
]

const highlights = [
  { value: 'AI', label: 'Product strategy' },
  { value: 'ML', label: 'Production systems' },
  { value: 'R&D', label: 'Applied research' },
]

const projects = [
  {
    name: 'Intelligent Decision Engine',
    type: 'AI platform',
    summary:
      'A decision-support system that combines data pipelines, model orchestration, and human review loops.',
    stack: ['Machine Learning', 'MLOps', 'Product AI'],
    href: '#contact',
  },
  {
    name: 'Computer Vision Workflow',
    type: 'Applied ML',
    summary:
      'A production-oriented vision workflow for extracting useful signals from messy real-world inputs.',
    stack: ['Python', 'Deep Learning', 'Evaluation'],
    href: '#contact',
  },
  {
    name: 'LLM Automation Layer',
    type: 'AI agents',
    summary:
      'A conversational automation layer with retrieval, tools, guardrails, and measurable task completion.',
    stack: ['LLMs', 'Agents', 'RAG'],
    href: '#contact',
  },
]

const capabilities = [
  'AI/ML strategy',
  'Applied research',
  'LLM systems',
  'MLOps architecture',
  'Data products',
  'Model evaluation',
]

const timeline = [
  {
    year: 'Now',
    title: 'Lead AI/ML',
    description: 'Leading AI product direction, model delivery, evaluation, and production ML systems.',
  },
  {
    year: '2025',
    title: 'Production intelligence',
    description: 'Built AI workflows that connect data, models, users, and measurable outcomes.',
  },
  {
    year: '2024',
    title: 'Applied machine learning',
    description: 'Worked across experimentation, deployment, monitoring, and business-facing ML use cases.',
  },
]

type GitHubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  topics?: string[]
}

const getInitial = (name: string) => name.trim().charAt(0).toUpperCase() || 'P'

function App() {
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([])

  useEffect(() => {
    if (!profile.githubUsername) {
      return
    }

    const controller = new AbortController()

    fetch(`https://api.github.com/users/${profile.githubUsername}/repos?sort=updated&per_page=6`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load GitHub projects')
        }
        return response.json() as Promise<GitHubRepo[]>
      })
      .then((repos) => {
        setGithubRepos(repos.filter((repo) => !repo.name.includes('.github.io')).slice(0, 3))
      })
      .catch(() => {
        setGithubRepos([])
      })

    return () => controller.abort()
  }, [])

  const visibleProjects = useMemo(() => {
    if (!githubRepos.length) {
      return projects
    }

    return githubRepos.map((repo) => ({
      name: repo.name.replaceAll('-', ' '),
      type: repo.language || 'GitHub project',
      summary: repo.description || 'A recent public GitHub project from this profile.',
      stack: repo.topics?.length ? repo.topics.slice(0, 3) : [repo.language || 'Code'],
      href: repo.html_url,
    }))
  }, [githubRepos])

  return (
    <main className="site-shell">
      <section className="hero-section" aria-labelledby="hero-title">
        <nav className="topbar" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label={`${profile.name} home`}>
            <span className="brand-mark">{getInitial(profile.name)}</span>
            <span>{profile.name}</span>
          </a>
          <div className="nav-links">
            <a href="#work">Work</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <div className="status-pill">
              <span className="pulse-dot" aria-hidden="true" />
              {profile.availability}
            </div>
            <p className="eyebrow">{profile.role} based in {profile.location}</p>
            <h1 id="hero-title">{profile.tagline}</h1>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-actions">
              <a className="button primary-button" href="#work">
                See the work
              </a>
              <a className="button ghost-button" href={`mailto:${profile.email}`}>
                Start a project
              </a>
            </div>
          </div>

          <aside className="profile-card" aria-label="Profile summary">
            <div className="orbital-card">
              <div className="avatar" aria-hidden="true">
                {getInitial(profile.name)}
              </div>
              <div>
                <p className="card-label">Profile</p>
                <h2>{profile.name}</h2>
                <p>{profile.role}</p>
              </div>
            </div>
            <div className="signal-card">
              <span>Current focus</span>
              <strong>AI strategy, ML systems, LLM products, and production-ready intelligence.</strong>
            </div>
          </aside>
        </div>

        <div className="metric-row" aria-label="Portfolio highlights">
          {highlights.map((item) => (
            <div className="metric-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title">AI/ML projects with real product direction.</h2>
          <p>
            Add your GitHub username in <code>profile.githubUsername</code> to pull recent
            public repositories into this section automatically.
          </p>
        </div>

        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <a className="project-card" href={project.href} key={project.name} rel="noreferrer" target={project.href.startsWith('http') ? '_blank' : undefined}>
              <div className="project-visual" aria-hidden="true">
                <span>0{index + 1}</span>
              </div>
              <div className="project-content">
                <p>{project.type}</p>
                <h3>{project.name}</h3>
                <span>{project.summary}</span>
                <div className="tag-row">
                  {project.stack.map((item) => (
                    <small key={item}>{item}</small>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section-block split-section" id="skills" aria-labelledby="skills-title">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Capabilities</p>
          <h2 id="skills-title">From research ideas to production AI systems.</h2>
        </div>
        <div className="capability-grid">
          {capabilities.map((capability) => (
            <div className="capability-card" key={capability}>
              {capability}
            </div>
          ))}
        </div>
      </section>

      <section className="section-block timeline-section" aria-labelledby="timeline-title">
        <div className="section-heading compact-heading">
          <p className="eyebrow">Background</p>
          <h2 id="timeline-title">Built around practical intelligence and measurable outcomes.</h2>
        </div>
        <div className="timeline">
          {timeline.map((item) => (
            <article className="timeline-item" key={item.title}>
              <span>{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-title">
        <p className="eyebrow">Contact</p>
        <h2 id="contact-title">Have an AI problem worth solving properly?</h2>
        <p>
          Send a short note about the goal, data, users, and timeline. I will help shape it
          into a practical AI/ML direction.
        </p>
        <div className="contact-actions">
          <a className="button primary-button" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="social-links" aria-label="Social links">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
