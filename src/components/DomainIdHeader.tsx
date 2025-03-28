// "use client"

// import { deleteDomain, updateDomain } from "@/actions";
// import { useState } from "react";
// import { Button } from "./ui/button";

// const DomainIdHeader = ({ domain, id }: { domain: string; id: string }) => {
//     const [newDomain, setNewDomain] = useState(domain);
//     const [newPrompt, setNewPrompt] = useState("");
//     const [isEditing, setIsEditing] = useState(false);

//     const handleUpdate = async () => {
//         const response = await updateDomain({ id, domain: newDomain, prompt: newPrompt });
//         if (response.success) {
//             toast("Domain updated successfully!");
//             setIsEditing(false);
//         } else {
//             toast(response.error);
//         }
//     };

//     const handleDelete = async () => {
//         if (!confirm("Are you sure you want to delete this domain?")) return;
//         const response = await deleteDomain(id);
//         if (response.success) {
//             alert("Domain deleted successfully!");
//             window.location.reload();
//         } else {
//             alert(response.error);
//         }
//     };

//     return (
//         <div className="border p-5 w-fit rounded-2xl">
//             {isEditing ? (
//                 <>
//                     <input
//                         className="border p-2 rounded"
//                         value={newDomain}
//                         onChange={(e) => setNewDomain(e.target.value)}
//                     />
//                     <input
//                         className="border p-2 rounded mt-2"
//                         placeholder="New prompt..."
//                         value={newPrompt}
//                         onChange={(e) => setNewPrompt(e.target.value)}
//                     />
//                     <button onClick={handleUpdate} className="bg-blue-500 text-white px-3 py-1 rounded mt-2">
//                         Save
//                     </button>
//                     <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-3 py-1 rounded mt-2 ml-2">
//                         Cancel
//                     </button>
//                 </>
//             ) : (
//                 <>
//                     <p className="text-3xl font-bold">{domain}</p>
//                     <p className="text-neutral-600">ID: {id}</p>
//                     <Button onClick={() => setIsEditing(true)} className=" px-3 py-1 rounded mt-2">
//                         Edit
//                     </Button>
//                     <Button onClick={handleDelete} className="px-3 py-1 rounded mt-2 ml-2 bg-rose-600 text-white">
//                         Delete
//                     </Button>
//                 </>
//             )}
//         </div>
//     );
// };

// export default DomainIdHeader;



"use client";

import { deleteDomain, updateDomain } from "@/actions";
import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

const DomainIdHeader = ({ domain, id, prompt = "" }: { domain: string; id: string, prompt: string }) => {
    const [newPrompt, setNewPrompt] = useState(prompt);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const router = useRouter()

    const handleUpdate = async () => {
        const response = await updateDomain({ id, domain, prompt: newPrompt });
        if (response.success) {
            toast("Prompt updated successfully!");
            setIsEditOpen(false);
            router.refresh()
        } else {
            toast(response.error);
        }
    };

    const handleDelete = async () => {
        const response = await deleteDomain(id);
        if (response.success) {
            toast("Domain deleted successfully!");
            router.replace("/domain")
        } else {
            toast(response.error);
        }
    };

    return (
        <div className="border p-5 w-fit rounded-2xl">
            <p className="text-3xl font-bold">{domain}</p>
            <p className="text-neutral-600">ID: {id}</p>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                    <Button className="px-3 py-1 rounded mt-2">Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Prompt</DialogTitle>
                    </DialogHeader>
                    <Separator />
                    <p className=" flex gap-3 items-baseline">
                        Domain :
                        <span className=" text-2xl font-bold">
                            {domain}
                        </span>
                    </p>
                    <div className="space-y-3">
                        <Label htmlFor="prompt">New Prompt</Label>
                        <Textarea
                            id="prompt"
                            placeholder="Enter new prompt..."
                            value={newPrompt}
                            onChange={(e) => setNewPrompt(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button onClick={handleUpdate} className="bg-blue-500 text-white">Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogTrigger asChild>
                    <Button className="px-3 py-1 rounded mt-2 ml-2 bg-rose-600 text-white">Delete</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this domain? This action cannot be undone.</p>
                    <DialogFooter>
                        <Button onClick={() => setIsDeleteOpen(false)} className="bg-gray-500">Cancel</Button>
                        <Button onClick={handleDelete} className="bg-rose-600 text-white">Delete</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default DomainIdHeader;
