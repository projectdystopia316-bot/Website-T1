import * as XLSX from 'xlsx'
import type { WaitlistEntry } from './db'

/**
 * Export waitlist entries to CSV file
 */
export function exportToCSV(entries: WaitlistEntry[]): void {
  if (entries.length === 0) {
    alert('No entries to export')
    return
  }

  // Create CSV content
  const headers = ['Name', 'Email', 'Consent', 'Joined At', 'ID']
  const rows = entries.map(entry => [
    entry.name,
    entry.email,
    entry.consent ? 'Yes' : 'No',
    new Date(entry.timestamp).toISOString(),
    entry.id,
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n')

  // Create and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', `waitlist-${Date.now()}.csv`)
  link.style.visibility = 'hidden'
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  URL.revokeObjectURL(url)
}

/**
 * Export waitlist entries to XLSX file
 */
export function exportToXLSX(entries: WaitlistEntry[]): void {
  if (entries.length === 0) {
    alert('No entries to export')
    return
  }

  // Prepare data for spreadsheet
  const data = entries.map(entry => ({
    Name: entry.name,
    Email: entry.email,
    Consent: entry.consent ? 'Yes' : 'No',
    'Joined At': new Date(entry.timestamp).toLocaleString(),
    ID: entry.id,
  }))

  // Create worksheet and workbook
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Waitlist')

  // Download
  XLSX.writeFile(workbook, `waitlist-${Date.now()}.xlsx`)
}

