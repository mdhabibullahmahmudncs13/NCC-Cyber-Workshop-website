import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// Extend jsPDF type to include autoTable
declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}

// Updated interface for direct registration data
interface RegistrationData {
  $id: string
  user_id: string
  workshop_type: string
  registration_date: string
  payment_status: string
  payment_transaction_number?: string
  payment_transaction_id?: string
  payment_screenshot_url?: string
  payment_submitted_at?: string
  $createdAt: string
  $updatedAt: string
}

export const generatePaymentReportPDF = (registrationData: RegistrationData[], userData: any[]) => {
  const doc = new jsPDF()
  
  // Add header
  doc.setFontSize(20)
  doc.setTextColor(0, 174, 239) // Cyber blue
  doc.text('NCC Cyber Workshop 2025', 20, 20)
  
  doc.setFontSize(16)
  doc.setTextColor(0, 0, 0)
  doc.text('Payment Report', 20, 35)
  
  // Add date and summary
  const currentDate = new Date().toLocaleDateString()
  doc.setFontSize(12)
  doc.text(`Generated on: ${currentDate}`, 20, 50)
  doc.text(`Total Registrations: ${registrationData.length}`, 20, 60)
  
  // Calculate summary statistics
  const verifiedPayments = registrationData.filter(item => item.payment_status === 'verified').length
  const pendingPayments = registrationData.filter(item => item.payment_status === 'pending').length
  const rejectedPayments = registrationData.filter(item => item.payment_status === 'rejected').length
  
  doc.text(`Verified Payments: ${verifiedPayments}`, 20, 70)
  doc.text(`Pending Payments: ${pendingPayments}`, 20, 80)
  doc.text(`Rejected Payments: ${rejectedPayments}`, 20, 90)
  
  // Prepare table data by combining registration and user data
  const tableData = registrationData.map(item => {
    const user = userData.find(u => u.$id === item.user_id)
    return [
      user?.name || 'Unknown User',
      user?.student_id || 'N/A',
      user?.email || 'N/A',
      user?.phone || 'N/A',
      user?.institution || 'N/A',
      new Date(item.registration_date).toLocaleDateString(),
      item.payment_status.toUpperCase(),
      item.payment_transaction_number || 'N/A',
      item.$id
    ]
  })
  
  // Create table
  autoTable(doc, {
    head: [[
      'Name',
      'Student ID',
      'Email',
      'Phone',
      'Institution',
      'Reg. Date',
      'Payment Status',
      'Transaction No.',
      'Reference'
    ]],
    body: tableData,
    startY: 110,
    styles: {
      fontSize: 8,
      cellPadding: 2,
    },
    headStyles: {
      fillColor: [0, 174, 239], // Cyber blue
      textColor: [255, 255, 255],
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 30 }, // Name
      1: { cellWidth: 25 }, // Student ID
      2: { cellWidth: 35 }, // Email
      3: { cellWidth: 25 }, // Phone
      4: { cellWidth: 30 }, // Institution
      5: { cellWidth: 20 }, // Date
      6: { cellWidth: 22 }, // Status
      7: { cellWidth: 25 }, // Transaction
      8: { cellWidth: 20 } // Reference
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    margin: { top: 110, left: 10, right: 10 }
  })
  
  // Add footer
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(10)
    doc.setTextColor(128, 128, 128)
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.getWidth() - 30,
      doc.internal.pageSize.getHeight() - 10
    )
    doc.text(
      'NCC Cyber Workshop 2025 - Confidential',
      20,
      doc.internal.pageSize.getHeight() - 10
    )
  }
  
  return doc
}

export const downloadPaymentReport = (registrationData: RegistrationData[], userData: any[]) => {
  const doc = generatePaymentReportPDF(registrationData, userData)
  const fileName = `NCC_Payment_Report_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}

export const generateSummaryReportPDF = (registrationData: RegistrationData[], userData: any[]) => {
  const doc = new jsPDF()
  
  // Add header
  doc.setFontSize(24)
  doc.setTextColor(0, 174, 239)
  doc.text('NCC Cyber Workshop 2025', 20, 30)
  
  doc.setFontSize(18)
  doc.setTextColor(0, 0, 0)
  doc.text('Registration Summary Report', 20, 50)
  
  // Add date
  const currentDate = new Date().toLocaleDateString()
  doc.setFontSize(12)
  doc.text(`Generated on: ${currentDate}`, 20, 70)
  
  // Calculate detailed statistics
  const totalRegistrations = registrationData.length
  const verifiedPayments = registrationData.filter(item => item.payment_status === 'verified')
  const pendingPayments = registrationData.filter(item => item.payment_status === 'pending')
  const rejectedPayments = registrationData.filter(item => item.payment_status === 'rejected')
  
  // Institution breakdown
  const institutions = registrationData.reduce((acc, item) => {
    const user = userData.find(u => u.$id === item.user_id)
    const institution = user?.institution || 'Unknown'
    acc[institution] = (acc[institution] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  
  // Summary statistics
  let yPosition = 90
  doc.setFontSize(14)
  doc.setTextColor(0, 0, 0)
  doc.text('Registration Statistics:', 20, yPosition)
  
  yPosition += 20
  doc.setFontSize(12)
  doc.text(`Total Registrations: ${totalRegistrations}`, 30, yPosition)
  yPosition += 15
  doc.text(`Verified Payments: ${verifiedPayments.length} (${((verifiedPayments.length/totalRegistrations)*100).toFixed(1)}%)`, 30, yPosition)
  yPosition += 15
  doc.text(`Pending Payments: ${pendingPayments.length} (${((pendingPayments.length/totalRegistrations)*100).toFixed(1)}%)`, 30, yPosition)
  yPosition += 15
  doc.text(`Rejected Payments: ${rejectedPayments.length} (${((rejectedPayments.length/totalRegistrations)*100).toFixed(1)}%)`, 30, yPosition)
  
  // Institutions breakdown (top 10)
  if (Object.keys(institutions).length > 0) {
    const topInstitutions = Object.entries(institutions)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
    
    yPosition += 25
    if (yPosition > 200) {
      doc.addPage()
      yPosition = 30
    }
    
    doc.setFontSize(14)
    doc.text('Top Institutions:', 20, yPosition)
    
    const institutionData = topInstitutions.map(([institution, count]) => [
      institution,
      count.toString(),
      `${((count/totalRegistrations)*100).toFixed(1)}%`
    ])
    
    autoTable(doc, {
      head: [['Institution', 'Registrations', 'Percentage']],
      body: institutionData,
      startY: yPosition + 10,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 174, 239] },
      margin: { left: 30, right: 30 }
    })
  }
  
  return doc
}

export const downloadSummaryReport = (registrationData: RegistrationData[], userData: any[]) => {
  const doc = generateSummaryReportPDF(registrationData, userData)
  const fileName = `NCC_Summary_Report_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}

// ID Card Generator for Individual Users
export const generateEventIDCard = (user: any, registration: any) => {
  // Create a landscape ID card (85.6mm x 53.98mm standard credit card size, scaled up for visibility)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [120, 80] // Scaled up ID card size for better readability
  })

  // Background gradient effect (simulated with rectangles)
  doc.setFillColor(15, 23, 42) // Dark background
  doc.rect(0, 0, 120, 80, 'F')

  // Cyber blue accent strips
  doc.setFillColor(0, 174, 239) // Cyber blue
  doc.rect(0, 0, 120, 8, 'F') // Top strip
  doc.rect(0, 72, 120, 8, 'F') // Bottom strip

  // Side accent
  doc.setFillColor(34, 197, 94) // Cyber green
  doc.rect(0, 8, 4, 64, 'F') // Left side accent

  // Main content area background
  doc.setFillColor(30, 41, 59) // Slightly lighter dark
  doc.rect(8, 12, 104, 56, 'F')

  // Header section
  doc.setFontSize(14)
  doc.setTextColor(0, 174, 239) // Cyber blue
  doc.setFont('helvetica', 'bold')
  doc.text('NCC CYBER WORKSHOP 2025', 60, 20, { align: 'center' })

  // Event ID
  doc.setFontSize(8)
  doc.setTextColor(34, 197, 94) // Cyber green
  doc.text('EVENT ID', 60, 26, { align: 'center' })

  // Profile picture placeholder
  doc.setFillColor(55, 65, 81) // Gray background for photo
  doc.rect(12, 30, 20, 25, 'F')
  doc.setTextColor(156, 163, 175)
  doc.setFontSize(8)
  doc.text('PHOTO', 22, 42, { align: 'center' })

  // User information
  doc.setTextColor(255, 255, 255) // White text
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text(user.name.toUpperCase(), 36, 35)

  // Student ID with background
  doc.setFillColor(0, 174, 239, 0.2)
  doc.rect(36, 37, 40, 6, 'F')
  doc.setFontSize(8)
  doc.setTextColor(0, 174, 239)
  doc.text(`ID: ${user.student_id}`, 38, 41)

  // Institution
  doc.setTextColor(203, 213, 225) // Light gray
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  const institution = user.institution.length > 25 ? user.institution.substring(0, 25) + '...' : user.institution
  doc.text(institution, 36, 47)

  // Payment status with colored background
  const statusColor = registration.payment_status === 'verified' ? [34, 197, 94] : 
                     registration.payment_status === 'pending' ? [251, 191, 36] : [239, 68, 68]
  const statusText = registration.payment_status.toUpperCase()
  
  doc.setFillColor(statusColor[0], statusColor[1], statusColor[2], 0.8)
  doc.rect(36, 50, 25, 6, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7)
  doc.text(statusText, 48.5, 54, { align: 'center' })

  // Workshop type
  doc.setFillColor(147, 51, 234, 0.2) // Purple background
  doc.rect(64, 50, 25, 6, 'F')
  doc.setTextColor(147, 51, 234)
  doc.text('PARTICIPANT', 76.5, 54, { align: 'center' })

  // QR Code placeholder (you can integrate a real QR code library)
  doc.setFillColor(255, 255, 255)
  doc.rect(92, 30, 20, 20, 'F')
  doc.setTextColor(0, 0, 0)
  doc.setFontSize(6)
  doc.text('QR CODE', 102, 40, { align: 'center' })
  doc.text(user.student_id, 102, 44, { align: 'center' })

  // Registration date
  doc.setTextColor(156, 163, 175)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6)
  const regDate = new Date(registration.registration_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
  doc.text(`Registered: ${regDate}`, 92, 55)

  // Contact info
  doc.setTextColor(100, 116, 139)
  doc.setFontSize(5)
  doc.text('Email: ' + (user.email.length > 20 ? user.email.substring(0, 20) + '...' : user.email), 12, 62)
  doc.text('Phone: ' + user.phone, 12, 65)

  // Security watermark
  doc.setTextColor(30, 41, 59, 0.3)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.text('NCC', 60, 45, { align: 'center', angle: -15 })

  // Footer
  doc.setTextColor(156, 163, 175)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(5)
  doc.text('NITER COMPUTER CLUB', 60, 75, { align: 'center' })
  doc.text('www.ncc-workshop.com', 60, 78, { align: 'center' })

  return doc
}

export const downloadEventIDCard = (user: any, registration: any) => {
  const doc = generateEventIDCard(user, registration)
  const fileName = `NCC_Event_ID_${user.student_id}_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(fileName)
}
