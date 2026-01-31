{{- define "backend.name" -}}
{{- default .Chart.Name .Values.nameOverride -}}
{{- end }}

{{- define "backend.fullname" -}}
{{- printf "%s-%s" .Release.Name (include "backend.name" .) -}}
{{- end }}

{{- define "backend.labels" -}}
app.kubernetes.io/name: {{ include "backend.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}
