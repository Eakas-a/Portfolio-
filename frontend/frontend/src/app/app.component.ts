import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatAgentComponent } from './components/chat-agent/chat-agent.component';
import { HeroComponent } from './components/hero/hero.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavComponent } from './components/nav/nav.component';

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
    NavComponent
  ],
  template: `
    <app-nav></app-nav>
    <main>
      <app-hero></app-hero>
      <app-projects></app-projects>
      <app-skills></app-skills>
      <app-experience></app-experience>
      <app-contact></app-contact>
    </main>
    <app-chat-agent></app-chat-agent>
  `
})
export class AppComponent {}
