import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Fragment } from 'react'
import { useRecoilState } from 'recoil'
import { modalStateComment } from '../atoms/modalAtom'
import CommentAreaInput from './CommentAreaInput'

export default function CommentModal() {
  let [isOpen, setIsOpen] = useRecoilState(modalStateComment)

  return (
    <Transition.Root appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as="Fragment"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#3a444b] bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as="Fragment"
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
           <section className="mx-4 mb-4 inline-block transform overflow-hidden rounded-xl bg-black pt-5 text-left align-bottom text-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 sm:align-middle">
              <div className="absolute  -mt-3 -ml-2 h-8 w-8 rounded-full bg-black bg-opacity-70 backdrop-blur-sm backdrop-filter hover:bg-gray-700 hover:bg-opacity-60">
                <XIcon
                  onClick={() => setIsOpen(false)}
                  className="my-auto mx-auto mt-1.5 h-5 w-5 cursor-pointer text-white "
                />
              </div>
              <CommentAreaInput />
            </section>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
