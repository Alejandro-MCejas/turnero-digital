"use client"

import TimeSlotButton from "@/components/patient/ui/TimeSlotButton"
import EmptyState from "@/components/shared/empty-state/EmptyState"
import Loader from "@/components/ui/feedback/Loader"
import { useDoctorAvailability } from "@/features/doctors/hooks/useDoctorAvailability"
import { CalendarSearch, Clock3 } from "lucide-react"

interface AppointmentTimeSlotsProps {
    doctorId: string
    date: string
    selectedTime: string
    onSelect: (time: string) => void
}

export default function AppointmentTimeSlots({ doctorId, date, selectedTime, onSelect }: AppointmentTimeSlotsProps) {

    const { data: availableTimes = [], isLoading, isError } = useDoctorAvailability(doctorId, date)

    return (
        <div>
            <h3 className="mb-3 text-sm font-medium text-slate-800">Horarios disponibles</h3>

            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-3">
                {!doctorId || !date ? (
                    <div className="col-span-3 w-full">
                        <EmptyState
                            size="sm"
                            icon={<CalendarSearch className="h-10 w-10" />}
                            title="Seleccioná una fecha"
                            description="Elegí un médico y una fecha para consultar los horarios disponibles."
                        />
                    </div>
                ) : isLoading ? (
                    <div className="col-span-3 w-full">
                        <Loader
                            title="Cargando horarios"
                            description="Consultando los horarios disponibles..."
                        />
                    </div>
                ) : isError ? (
                    <div className="col-span-3 w-full rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                        <p className="text-sm text-red-600">No se pudieron cargar los horarios del profesional.</p>
                    </div>
                ) : availableTimes.length > 0 ? (

                    availableTimes.map(time => (
                        <TimeSlotButton
                            key={time}
                            time={time}
                            selected={selectedTime === time}
                            onClick={() => onSelect(time)}
                        />
                    ))
                ) : (
                    <div className="col-span-3 w-full">
                        <EmptyState
                            size="sm"
                            icon={<Clock3 className="h-10 w-10" />}
                            title="No hay horarios disponibles"
                            description="El médico no tiene horarios disponibles para la fecha seleccionada."
                        />
                    </div>
                )}
            </div>
        </div>
    )
}