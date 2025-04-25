import { useNotesContext } from "../context/NotesContext"
import "./ActivityLog.css"

export default function ActivityLog() {
  const { activities } = useNotesContext()
  
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date)
  }

  const formatChanges = (changes: string) => {
    if (!changes) return ""
    
    // Split by comma if there are multiple changes
    const changesList = changes.split(', ')
    return changesList.map((change, i) => (
      <div key={i} className="activity-change-item">
        {change}
      </div>
    ))
  }
  
  return (
    <div className="activity-log">
      <div className="activity-log-header">
        <h2 className="activity-log-title">Activity Log</h2>
      </div>
      
      {activities.length === 0 ? (
        <div className="activity-log-empty">
          <p>No recent activity</p>
        </div>
      ) : (
        <div className="activity-log-list">
          {activities.map((activity) => (
            <div key={activity._id || activity.id} className="activity-log-item">
              <div className="activity-log-user">
                <span className="user-avatar">
                  {activity.userId?.name?.charAt(0) || activity.user?.charAt(0) || '?'}
                </span>
                <span className="user-name">
                  {activity.userId?.name || activity.user || 'Unknown user'}
                </span>
              </div>
              
              <div className="activity-log-content">
                <div className="activity-action">
                  <span className={`action-badge ${activity.action}`}>
                    {activity.action}
                  </span>
                  <span className="note-title">
                    {activity.noteId?.title || ''}
                  </span>
                </div>
                
                {activity.changes && (
                  <div className="activity-changes">
                    {formatChanges(activity.changes)}
                  </div>
                )}
                
                <div className="activity-log-time">
                  {formatTime(activity.timestamp || activity.createdAt)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}