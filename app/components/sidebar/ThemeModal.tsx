'use client'

import { Dialog, DialogPanel, Transition, TransitionChild, DialogTitle } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useThemeColor } from '@/app/context/ThemeContext'

const colors = [
  { name: 'Red', hex: '#ef4444' },
  { name: 'Yellow', hex: '#facc15' },
  { name: 'Orange', hex: '#f97316' },
  { name: 'Green', hex: '#22c55e' },
  { name: 'Purple', hex: '#a855f7' }
]

interface CustomModalProps {
  isOpen: boolean
  onClose: () => void
}

const CustomModal: React.FC<CustomModalProps> = ({ isOpen, onClose }) => {
  const { themeColor, setThemeColor } = useThemeColor()
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const DEFAULT_THEME = 'Default';

  useEffect(() => {
    const savedColorName = localStorage.getItem('themeColor')
    const foundColor = colors.find(c => c.name === savedColorName)
    if (foundColor) {
      setSelectedColor(foundColor)
      setThemeColor(foundColor.name) // Also set in context
      console.log('Loaded color from localStorage:', foundColor.name)
    }
  }, [setThemeColor])

  const handleColorChange = (name: string) => {
    const color = colors.find(c => c.name === name)
    if (color) {
      setSelectedColor(color)
      localStorage.setItem('themeColor', color.name)
      setThemeColor(color.name)
      console.log('Theme color selected:', color.name)
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Choose Theme
                </DialogTitle>

                <div className="mt-2 text-sm text-gray-500">
                  Select any one colour to be saved as your theme
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Choose Color:
                  </label>
                  <div className="relative">
                    <select
                      value={selectedColor.name}
                      onChange={(e) => handleColorChange(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      {colors.map((color) => (
                        <option key={color.name} value={color.name}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                    <div
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: selectedColor.hex }}
                    ></div>
                  </div>
                </div>
                      
              <div className="mt-6 flex justify-end space-x-2">
  <button
    type="button"
    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
    onClick={() => {
      localStorage.removeItem('themeColor');
      setSelectedColor(colors[0]);
      setThemeColor('Default');
      console.log('Theme reverted to default.');
    }}
  >
    Set Default Theme
  </button>

  <button
    type="button"
    className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
    onClick={onClose}
  >
    Close
  </button>
</div>

              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default CustomModal
