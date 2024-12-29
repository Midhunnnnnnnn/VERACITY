"use client"; // This directive marks the file as a client component

import { useState } from 'react';
import { ethers } from 'ethers';
import { useAuth0 } from '@auth0/auth0-react'; // Using Auth0 for authentication
import VideoThumb from "@/public/images/hero-image-01.jpg";
import ModalVideo from "@/components/modal-video";
import { X } from 'lucide-react';

enum UserRole {
    ADMIN = 0,
    PATIENT = 1,
    MEDICAL_CENTER = 2
}

interface UserState {
    address: string;
    role: UserRole | null;
    isConnected: boolean;
    auth0Id?: string;
}

interface AccessEntry {
    address: string;
    name: string;
    grantedAt: number;
    role: string;
}

// Inline Input Component
const Input = ({ value, onChange, placeholder }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string }) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring focus:ring-indigo-500"
    />
);

// Inline Button Component
const Button = ({ onClick, children, disabled }: { onClick: () => void; children: React.ReactNode; disabled?: boolean }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`px-4 py-2 rounded ${disabled ? 'bg-gray-600' : 'bg-indigo-600 hover:bg-indigo-700'} text-white focus:outline-none`}
    >
        {children}
    </button>
);

// Inline Card Component
const Card = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-gray-800 rounded-lg shadow-lg p-4">
        {children}
    </div>
);

export default function HeroHome() {
    const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
    const [userState, setUserState] = useState<UserState>({
        address: '',
        role: null,
        isConnected: false
    });
    const [contract, setContract] = useState<ethers.Contract | null>(null);
    const [accessList, setAccessList] = useState<AccessEntry[]>([]);
    const [newAccess, setNewAccess] = useState({ address: '' }); // Removed duration as it's not needed now
    const [loading, setLoading] = useState(false);

    const contractAddress = "0xca366124a3307cc4910127232803e6cda8492c86";
    const contractABI = [
        "function registerUser(address user, uint8 role) external",
        "function roles(address) external view returns (uint8)",
        "function grantAccess(address medical) external",
        "function revokeAccess(address medical) external",
        "function addMedicalData(string memory _data) external",
        "function viewData(address patient) external view returns (string memory)",
        "function getAccessList() external view returns (address[])"
    ];

    const connectWallet = async () => {
        if (!isAuthenticated) {
            await loginWithRedirect();
            return;
        }

        if (typeof window.ethereum !== "undefined") {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
                setContract(contractInstance);

                const role = await contractInstance.roles(address);
                setUserState({
                    address,
                    role: role as UserRole,
                    isConnected: true,
                    auth0Id: user?.sub
                });

                // Load access list if user is a patient
                if (role === UserRole.PATIENT) {
                    loadAccessList();
                }
            } catch (error) {
                console.error("Error connecting wallet:", error);
            }
        } else {
            alert("Please install MetaMask to use this application.");
        }
    };

    const loadAccessList = async () => {
        try {
            // Mock data for access list
            const mockData: AccessEntry[] = [
                {
                    address: '0x1234...5678',
                    name: 'City Hospital',
                    grantedAt: Date.now(),
                    role: 'Hospital'
                }
            ];
            setAccessList(mockData);
        } catch (error) {
            console.error('Error loading access list:', error);
        }
    };

    const grantAccess = async () => {
        try {
            setLoading(true);
            if (!ethers.utils.isAddress(newAccess.address)) {
                throw new Error('Invalid Ethereum address');
            }

            // Call smart contract to grant access without duration
            const tx = await contract.grantAccess(newAccess.address);
            await tx.wait();

            // Update access list with new entry
            const newAccessEntry = {
                address: newAccess.address,
                name: 'New Medical Center', // In real app, fetch from a registry
                grantedAt: Date.now(),
                role: 'Pending Verification'
            };
            setAccessList([...accessList, newAccessEntry]);
            setNewAccess({ address: '' }); // Reset input field after granting access
        } catch (error) {
            console.error('Error granting access:', error);
        } finally {
            setLoading(false);
        }
    };

    const revokeAccess = async (address: string) => {
        try {
            setLoading(true);
            const tx = await contract.revokeAccess(address);
            await tx.wait();
            setAccessList(accessList.filter(entry => entry.address !== address));
        } catch (error) {
            console.error('Error revoking access:', error);
        } finally {
            setLoading(false);
        }
    };

    // Patient-specific content with access management
    const PatientContent = () => (
        <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-xl text-indigo-200/65">
                Welcome to your secure medical portal. Manage your health records and control access to your medical data.
            </p>
            <div className="mx-auto max-w-xs sm:flex sm:max-w-none sm:justify-center">
                <div>
                    <Card>
                        <h3 className="font-medium">Manage Access</h3>
                        <div className="grid gap-4 py-4">
                            <Input type="text" placeholder="Wallet Address (0x...)" value={newAccess.address} onChange={(e) => setNewAccess({ ...newAccess, address: e.target.value })} />
                            <Button onClick={grantAccess} disabled={loading}>Grant Access</Button>
                        </div>
                        <h3 className="mb-2 font-medium">Active Permissions</h3>
                        <div className="space-y-2">
                            {accessList.map((entry) => (
                                <div key={entry.address} className="flex items-center justify-between rounded bg-gray-800 p-2">
                                    <div>
                                        <p className="text-sm font-medium">{entry.name}</p>
                                    </div>
                                    <Button onClick={() => revokeAccess(entry.address)} disabled={loading}>
                                        <X size={16} />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
                <div data-aos="fade-up" data-aos-delay={600}>
                    <a className="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 text-gray-300 sm:w-auto" href="/view-records">View Records</a>
                </div>
            </div>
        </div>
    );

    return (
        <section>
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="py-12 md:py-20">
                    <div className="pb-12 text-center md:pb-20">
                        <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#E2E8F0,#A5B4FC,#F9FAFB,#A5B4FC,#E2E8F0)] bg-[length:200%_auto] bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl">
                            {isAuthenticated ? (
                                userState.role === UserRole.ADMIN ? "ADMIN PORTAL" :
                                userState.role === UserRole.MEDICAL_CENTER ? "MEDICAL PROFESSIONAL PORTAL" :
                                userState.role === UserRole.PATIENT ? "PATIENT PORTAL" :
                                "THE KEY TO BEING SAFE"
                            ) : "THE KEY TO BEING SAFE"}
                        </h1>

                        {isAuthenticated ? (
                            <>
                                {userState.isConnected ? (
                                    <>
                                        {userState.role === UserRole.ADMIN ? 
                                            /* AdminContent */ null : 
                                            userState.role === UserRole.MEDICAL_CENTER ? 
                                            /* MedicalContent */ null : 
                                            userState.role === UserRole.PATIENT ? 
                                            <PatientContent /> : 
                                            /* DefaultContent */ null
                                        }
                                    </>
                                ) : (
                                    <div className="text-center">
                                        <Button onClick={connectWallet}>Connect Wallet</Button> {/* Connect Wallet Button */}
                                    </div>
                                )}
                                <br />
                                
                          
                                {/* Add margin-top to the Logout button */}
                                <Button onClick={() => logout({ returnTo: window.location.origin })} className="mt-4 bg-gray-600">Logout</Button> {/* Logout Button */}
                            </>
                        ) : (
                            <div className="text-center">
                                <Button onClick={() => loginWithRedirect()}>Login / Register</Button> {/* Login/Register Button */}
                            </div>
                        )}
                    </div>

                    {/* Modal Video Component */}
                    <ModalVideo thumb={VideoThumb} thumbWidth={1104} thumbHeight={576} thumbAlt="Modal video thumbnail" video="/videos/video.mp4" videoWidth={1920} videoHeight={1080} />
                </div>
            </div>
        </section>
    );
}
