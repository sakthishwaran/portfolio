import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import type { WritableSignal } from '@angular/core';

export interface SkillItem {
  id: number;
  name: string;
  icon?: string;
  percentage: number;
  animatedPercentage: WritableSignal<number>;
}

@Component({
  selector: 'app-skill-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <article class="premium-card p-3 md:p-4" role="group" aria-label="Skill card">
      <div class="flex w-full min-w-0 items-center gap-3 md:gap-4">
        <div class="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-lg bg-white/10 text-(--color-primary) transition-transform duration-300 group-hover:scale-105 card-icon">
          <span class="text-lg md:text-xl">{{ skill.icon || '⚙' }}</span>
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex items-baseline justify-between gap-2">
            <div class="truncate text-sm md:text-base lg:text-lg font-semibold">{{ skill.name }}</div>
            <div class="shrink-0 text-xs md:text-sm font-mono text-(--color-primary)">{{ skill.animatedPercentage() | number:'1.0-0' }}%</div>
          </div>
          <div class="mt-2 md:mt-3 h-3 w-full rounded-full bg-(--color-surface) overflow-hidden">
            <div class="skill-fill" [style.width.%]="skill.animatedPercentage()"></div>
          </div>
        </div>
      </div>
    </article>
  `,
})
export class SkillBarComponent {
  @Input({ required: true }) skill!: SkillItem;
}
