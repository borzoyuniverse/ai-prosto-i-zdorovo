import { Injectable } from '@nestjs/common';

type RpcParams = Record<string, unknown> | undefined;

@Injectable()
export class JsonRpcService {
  handle(method: string, params: RpcParams) {
    switch (method) {
      case 'get-appointments':
        return [
          {
            id: 'appt-1',
            startDate: this.nowIso(),
            isRepeated: false,
            consultationTypeName: 'Consultation',
            consultationTypeId: 'type-1',
            specialistType: 'MASTER_COACH',
            unfilledQuestionnaires: [],
            consultationUrl: 'https://example.test/meet/1',
          },
        ];
      case 'get-appointment-types':
        return {
          consultationTypes: [
            {
              consultationTypeId: 'type-1',
              name: 'Consultation',
              description: 'General consultation',
              specialistType: 'MASTER_COACH',
              newAppointmentStatus: 'DEFAULT',
            },
          ],
        };
      case 'specialist-available':
        return { canBook: true };
      case 'get-goals':
        return {
          goals: [
            {
              id: 'goal-1',
              name: 'General goal',
              description: 'Goal description',
              formId: 'form-1',
            },
          ],
        };
      case 'free-slots':
        return {
          slots: [
            {
              time: this.nowIso(),
              slotIds: ['slot-1'],
            },
          ],
        };
      case 'create-appointment':
        return {
          id: 'appt-1',
          consultationTypeId:
            (params?.consultationTypeId as string | undefined) ?? 'type-1',
          goalId: (params?.goalId as string | undefined) ?? 'goal-1',
          slotId: (params?.slotId as string | undefined) ?? 'slot-1',
          specialistId: 'spec-1',
        };
      case 'confirm-appointment':
        return {
          id: (params?.appointmentId as string | undefined) ?? 'appt-1',
          slotId: 'slot-1',
          specialistId: 'spec-1',
        };
      case 'search-form':
        return {
          forms: [
            {
              formId: 'form-1',
              formType: 'GENERAL',
              isFilled: true,
              filledAt: this.nowIso(),
              title: 'General form',
            },
          ],
        };
      case 'get-form-template':
        return {
          title: 'General form',
          description: 'Basic questionnaire',
          fields: [
            {
              id: 'field-1',
              type: 'input',
              required: true,
              question: 'How do you feel today?',
              placeholder: 'Type your answer',
            },
          ],
        };
      case 'form-submission':
        return {
          answers: (params?.answers as Record<string, unknown> | undefined) ?? {},
        };
      case 'get-recommendations':
        return {
          recommendations: [
            {
              id: 'rec-1',
              specialistType: 'MASTER_COACH',
              text: 'Recommendation text',
              createdAt: this.nowIso(),
              attachments: [],
            },
          ],
        };
      case 'recommendations-specialist':
        return ['MASTER_COACH', 'NUTRITIONIST'];
      case 'get-profile':
        return {
          package: {
            totalConsultations: 10,
            usedConsultations: 2,
            validUntil: '2026-12-31',
          },
          personalInfo: {
            phone: '+70000000000',
            email: 'user@example.test',
            birthDate: '1990-01-01',
            insurerName: 'Insurer',
            policyNumber: 'POLICY-1',
            policyValidUntil: '2026-12-31',
            firstName: 'Ivan',
            lastName: 'Ivanov',
            middleName: 'Ivanovich',
          },
        };
      case 'get-chats':
        return {
          chats: [
            {
              id: 'chat-1',
              lastMessage: 'Hello',
              unreadCount: 0,
              lastMessageDate: this.nowIso(),
            },
          ],
        };
      case 'get-messages':
        return {
          messages: [
            {
              id: 'msg-1',
              chatId: (params?.chatId as string | undefined) ?? 'chat-1',
              senderId: 'user-1',
              text: 'Hello',
              createdAt: this.nowIso(),
            },
          ],
        };
      default:
        throw { code: -32601, message: `Method not found: ${method}` };
    }
  }

  private nowIso() {
    return new Date().toISOString();
  }
}
