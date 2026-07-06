import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatAgentComponent } from './components/chat-agent/chat-agent.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavComponent } from './components/nav/nav.component';
import { HeavenHeaderComponent } from './components/heaven-header/heaven-header.component';
import { StairGapComponent } from './components/stair-gap/stair-gap.component';
import { LazyNavComponent } from './components/lazy-nav/lazy-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ChatAgentComponent,
    HeroComponent,
    ProjectsComponent,
    SkillsComponent,
    ExperienceComponent,
    ContactComponent,
    NavComponent,
    HeavenHeaderComponent,
    StairGapComponent,
    LazyNavComponent
  ],
  template: `
    <app-nav></app-nav>
    <app-lazy-nav></app-lazy-nav>
    <app-heaven-header></app-heaven-header>
    <main>
      <app-hero></app-hero>

      <app-stair-gap
        label="Projects"
        icon="☁️"
        teaser="Systems shipped, impact measured."
        targetId="projects"
      ></app-stair-gap>
      <app-projects></app-projects>

      <app-stair-gap
        label="Skills"
        icon="🧞"
        teaser="The toolbox behind the magic."
        targetId="skills"
        [flip]="true"
      ></app-stair-gap>
      <app-skills></app-skills>

      <app-stair-gap
        label="Experience"
        icon="🪔"
        teaser="Years of work, distilled."
        targetId="experience"
      ></app-stair-gap>
      <app-experience></app-experience>

      <app-stair-gap
        label="Contact"
        icon="🔮"
        teaser="The last step — say hello."
        targetId="contact"
        [flip]="true"
      ></app-stair-gap>
      <app-contact></app-contact>
    </main>
    <app-chat-agent></app-chat-agent>
  `
})
export class AppComponent {}
