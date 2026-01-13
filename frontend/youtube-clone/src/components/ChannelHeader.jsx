export default function ChannelHeader({ channel }) {
  if (!channel) return null;

  return (
    <div className="channel-header">

      {/* Banner */}
      <div className="channel-banner">
        {channel.banner ? (
          <img src={channel.banner} alt="Channel Banner" />
        ) : (
          <div className="banner-placeholder">Channel Banner</div>
        )}
      </div>

      {/* Channel Info Row */}
  <div className="channel-info-row">

        {/* Avatar */}

        <div className="channel-avatar">
           {channel.channelName.charAt(0).toUpperCase()}
 </div>

        {/* Info */}

        <div className="channel-info">
         <h2>{channel.channelName}</h2>
             <p>{channel.description}</p>
                  <span>{channel.subscribers} subscribers</span>
        </div>
      </div>
    </div>
  );
}
