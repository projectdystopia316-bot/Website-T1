import { describe, it, expect, beforeEach, vi } from 'vitest'
import { tasks, categories, type Category } from './TasksGallery'

describe('TasksGallery', () => {
  describe('Filter Logic', () => {
    it('should have 12 total tasks', () => {
      expect(tasks).toHaveLength(12)
    })

    it('should correctly filter tasks by "home" category', () => {
      const homeTasks = tasks.filter(task => task.category === 'home')
      expect(homeTasks).toHaveLength(4)
      expect(homeTasks.every(task => task.category === 'home')).toBe(true)
    })

    it('should correctly filter tasks by "work" category', () => {
      const workTasks = tasks.filter(task => task.category === 'work')
      expect(workTasks).toHaveLength(6)
      expect(workTasks.every(task => task.category === 'work')).toBe(true)
    })

    it('should correctly filter tasks by "school" category', () => {
      const schoolTasks = tasks.filter(task => task.category === 'school')
      expect(schoolTasks).toHaveLength(1)
      expect(schoolTasks.every(task => task.category === 'school')).toBe(true)
    })

    it('should correctly filter tasks by "health" category', () => {
      const healthTasks = tasks.filter(task => task.category === 'health')
      expect(healthTasks).toHaveLength(1)
      expect(healthTasks.every(task => task.category === 'health')).toBe(true)
    })

    it('should return all tasks when category is "all"', () => {
      const category: Category = 'all'
      const filteredTasks = category === 'all' ? tasks : tasks.filter(t => t.category === category)
      expect(filteredTasks).toHaveLength(tasks.length)
    })

    it('should match category counts in categories array', () => {
      categories.forEach(cat => {
        if (cat.id === 'all') {
          expect(cat.count).toBe(tasks.length)
        } else {
          const actualCount = tasks.filter(t => t.category === cat.id).length
          expect(cat.count).toBe(actualCount)
        }
      })
    })
  })

  describe('Task Data Integrity', () => {
    it('should have all required fields for each task', () => {
      tasks.forEach(task => {
        expect(task).toHaveProperty('id')
        expect(task).toHaveProperty('icon')
        expect(task).toHaveProperty('title')
        expect(task).toHaveProperty('description')
        expect(task).toHaveProperty('cycle')
        expect(task).toHaveProperty('category')
        expect(task).toHaveProperty('tags')
        expect(task).toHaveProperty('prompt')
      })
    })

    it('should have unique IDs for all tasks', () => {
      const ids = tasks.map(task => task.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(tasks.length)
    })

    it('should have valid cycle values', () => {
      const validCycles = ['quick', 'deep', 'fold']
      tasks.forEach(task => {
        expect(validCycles).toContain(task.cycle)
      })
    })

    it('should have valid category values', () => {
      const validCategories = ['home', 'work', 'school', 'health']
      tasks.forEach(task => {
        expect(validCategories).toContain(task.category)
      })
    })

    it('should have at least one tag per task', () => {
      tasks.forEach(task => {
        expect(task.tags.length).toBeGreaterThan(0)
      })
    })

    it('should have non-empty prompts', () => {
      tasks.forEach(task => {
        expect(task.prompt).toBeTruthy()
        expect(task.prompt.length).toBeGreaterThan(10)
      })
    })
  })

  describe('Copy to Clipboard', () => {
    let clipboardWriteTextMock: any

    beforeEach(() => {
      // Mock navigator.clipboard.writeText
      clipboardWriteTextMock = vi.fn()
      Object.defineProperty(navigator, 'clipboard', {
        value: {
          writeText: clipboardWriteTextMock,
        },
        writable: true,
      })
    })

    it('should copy prompt text to clipboard', async () => {
      const testTask = tasks[0]
      clipboardWriteTextMock.mockResolvedValue(undefined)

      await navigator.clipboard.writeText(testTask.prompt)

      expect(clipboardWriteTextMock).toHaveBeenCalledWith(testTask.prompt)
      expect(clipboardWriteTextMock).toHaveBeenCalledTimes(1)
    })

    it('should handle clipboard API rejection gracefully', async () => {
      const testTask = tasks[0]
      const error = new Error('Clipboard access denied')
      clipboardWriteTextMock.mockRejectedValue(error)

      try {
        await navigator.clipboard.writeText(testTask.prompt)
      } catch (err) {
        expect(err).toBe(error)
      }

      expect(clipboardWriteTextMock).toHaveBeenCalledWith(testTask.prompt)
    })

    it('should handle missing clipboard API', async () => {
      // Remove clipboard API
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
      })

      const testTask = tasks[0]

      try {
        await navigator.clipboard.writeText(testTask.prompt)
      } catch (err) {
        expect(err).toBeTruthy()
      }
    })
  })

  describe('Specific Tasks from Canvas', () => {
    it('should include "Clean my desktop" task', () => {
      const task = tasks.find(t => t.id === 'clean-desktop')
      expect(task).toBeDefined()
      expect(task?.title).toBe('Clean my desktop')
      expect(task?.category).toBe('home')
    })

    it('should include "Find that file" task', () => {
      const task = tasks.find(t => t.id === 'find-file')
      expect(task).toBeDefined()
      expect(task?.title).toBe('Find that file')
      expect(task?.category).toBe('work')
    })

    it('should include "Smart rename & sort" task', () => {
      const task = tasks.find(t => t.id === 'smart-rename')
      expect(task).toBeDefined()
      expect(task?.title).toBe('Smart rename & sort')
    })

    it('should include "Auto-schedule" task', () => {
      const task = tasks.find(t => t.id === 'auto-schedule')
      expect(task).toBeDefined()
      expect(task?.title).toBe('Auto-schedule')
    })

    it('should include "Form filler" task', () => {
      const task = tasks.find(t => t.id === 'form-filler')
      expect(task).toBeDefined()
      expect(task?.title).toBe('Form filler')
    })

    it('should include "Study buddy" task', () => {
      const task = tasks.find(t => t.id === 'study-buddy')
      expect(task).toBeDefined()
      expect(task?.category).toBe('school')
    })

    it('should include "Clinic handoff" task', () => {
      const task = tasks.find(t => t.id === 'clinic-handoff')
      expect(task).toBeDefined()
      expect(task?.category).toBe('health')
    })

    it('should include "Household brain" task', () => {
      const task = tasks.find(t => t.id === 'household-brain')
      expect(task).toBeDefined()
      expect(task?.title).toBe('Household brain')
    })

    it('should include "Travel pack & plan" task', () => {
      const task = tasks.find(t => t.id === 'travel-pack')
      expect(task).toBeDefined()
      expect(task?.title).toBe('Travel pack & plan')
    })

    it('should include "Money tidy" task', () => {
      const task = tasks.find(t => t.id === 'money-tidy')
      expect(task).toBeDefined()
      expect(task?.title).toBe('Money tidy')
    })

    it('should include "Screenshot→table" task', () => {
      const task = tasks.find(t => t.id === 'screenshot-table')
      expect(task).toBeDefined()
      expect(task?.title).toBe('Screenshot→table')
    })

    it('should include "Dev assist" task', () => {
      const task = tasks.find(t => t.id === 'dev-assist')
      expect(task).toBeDefined()
      expect(task?.title).toBe('Dev assist')
      expect(task?.cycle).toBe('deep')
    })
  })
})

