import { XIcon } from '@heroicons/react/outline'
import Tweet from './Tweet'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

function Modal() {
  const [open, setOpen] = useRecoilState(modalState)
  
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-20 overflow-y-auto"
        onClose={() => setOpen(false)}
      >
        <div className="flex min-h-[800px] items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:min-h-screen sm:p-0">
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

          {/* This to trick the browerser to center the modals contents */}
          <span
            className="hidden sm:inline-block sm:h-screen"
            aria-hidden="true"
          >
            &#8203
          </span>

          <Transition.Child
            as="Fragment"
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <section className="mx-4 mb-4 inline-block transform overflow-hidden rounded-xl bg-black pt-5 text-left align-bottom text-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6 sm:align-middle">
              <div className="absolute  -mt-3 -ml-2 h-8 w-8 rounded-full bg-black bg-opacity-70 backdrop-blur-sm backdrop-filter hover:bg-gray-700 hover:bg-opacity-60">
                <XIcon
                  onClick={() => setOpen(false)}
                  className="my-auto mx-auto mt-1.5 h-5 w-5 cursor-pointer text-white "
                />
              </div>

              <Tweet />
            </section>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal
