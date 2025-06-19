"use client";

import Modal from '@/app/components/Modal';
import Button from '@/app/components/Button';
import { DialogTitle } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { FiAlertTriangle } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useCallback } from 'react';

interface DeleteAccountModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
  setIsLoading(true);

  axios.delete('/api/user')
    .then(() => {
      onClose(); 
       signOut();               // close the modal
      router.push('/');      // redirect to homepage
      router.refresh();      // refresh app state
    })
    .catch(() => toast.error('Something Went Wrong'))
    .finally(() => setIsLoading(false));

}, [onClose, router]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <DialogTitle
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete Account
          </DialogTitle>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
        <Button danger disabled={isLoading} onClick={onDelete}>
          Delete
        </Button>
        <Button secondary disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
