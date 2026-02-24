
import { useState } from 'react'
import downloadAllApplications from '../actions/DownloadAllApplications'
import downloadBulkApplications from '../actions/DownloadBulkApplications'
import { toast } from 'sonner'

interface SearchParams {
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
  bankingType?: string;
}

const usePdfDownload = ({searchTerm, startDate, endDate, bankingType}: SearchParams) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [loadingAll, setLoadingAll] = useState(false)
  const [loadingSelected, setLoadingSelected] = useState(false)

  const toggleSelect = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const isSelected = (id: number) => selectedIds.includes(id)

  const selectAllOnPage = (idsOnPage: number[]) => {
    setSelectedIds(prev => [...new Set([...prev, ...idsOnPage])])
  }

  const clearAllSelections = () => {
    setSelectedIds([])
  }

  const makeDownloadFile = (blob :Blob) => {
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'applications.zip'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleDownloadAll = async () => {
    setLoadingAll(true)
    try {
      const blob = await downloadAllApplications(searchTerm, startDate, endDate, bankingType)
      makeDownloadFile(blob);
    } catch (error) {
      toast.error('Download all failed')
      console.error('Download failed:', error)
    } finally {
      setLoadingAll(false)
    }
  }

  const handleBulkDownload = async () => {
    setLoadingSelected(true)
    try {
      const blob = await downloadBulkApplications(selectedIds)
      makeDownloadFile(blob);
    } catch (error) {
      toast.error('PDF download failed')
      console.error('Download failed:', error)
    } finally {
      setLoadingSelected(false)
    }
  }

  return {
    selectedIds,
    toggleSelect,
    isSelected,
    selectAllOnPage,
    clearAllSelections,
    handleDownloadAll,
    handleBulkDownload,
    loadingAll,
    loadingSelected,
  }
}

export default usePdfDownload
