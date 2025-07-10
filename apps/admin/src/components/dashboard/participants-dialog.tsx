"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Calendar, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { useEffect, useState, useCallback } from "react";
import { getParticipantsInChallenge } from "@/app/dashboard/challenges/actions";
import { Progress } from "@/components/ui/progress";

interface Participant {
  participationId: string;
  participantId: string;
  userId: string;
  email: string;
  progress: number;
  joinedAt: Date;
  userCreatedAt: Date;
}

interface ParticipantsDialogProps {
  challengeId: string;
  challengeName: string;
  challengeGoal: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ParticipantsDialog({
  challengeId,
  challengeName,
  challengeGoal,
  open,
  onOpenChange,
}: ParticipantsDialogProps) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  const loadParticipants = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getParticipantsInChallenge(challengeId);
      setParticipants(data);
    } catch (error) {
      console.error("Error loading participants:", error);
    } finally {
      setLoading(false);
    }
  }, [challengeId]);

  useEffect(() => {
    if (open) {
      loadParticipants();
    }
  }, [open, loadParticipants]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Challenge Participants
          </DialogTitle>
          <DialogDescription>
            {challengeName} - {participants.length} participants
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="text-center py-8">Loading participants...</div>
        ) : participants.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No participants yet
          </div>
        ) : (
          <div className="space-y-4">
            {participants.map((participant, index) => (
              <div
                key={participant.participationId}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gray-100">
                          {participant.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {index < 3 && (
                        <Badge
                          className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center"
                          variant={
                            index === 0
                              ? "default"
                              : index === 1
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {index + 1}
                        </Badge>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{participant.email}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Joined:{" "}
                          {format(
                            new Date(participant.joinedAt),
                            "MMM dd, yyyy"
                          )}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Progress: {participant.progress}/{challengeGoal}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Progress
                      value={(participant.progress / challengeGoal) * 100}
                      className="w-24 h-2"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {Math.round((participant.progress / challengeGoal) * 100)}
                      %
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
